import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  addScores,
  calculateResult,
  courseConfigurator,
  firstQuestionId,
  getQuestion,
  resolveNextQuestionId,
} from "../../data/courseConfigurator";
import type {
  Answer,
  Question,
  QuizResult,
  ScoreMap,
} from "../../types/courseConfigurator";
import ConfiguratorEffects from "./ConfiguratorEffects";
import GlassCubeStage from "./GlassCubeStage";
import NeonCompassStage from "./NeonCompassStage";
import ProcessingStage from "./ProcessingStage";
import {
  CategoryGlyph,
  categoryIdByRoutingAnswer,
  getVisualCategory,
  visualCategories,
  type VisualCategoryId,
} from "./visualCategories";
import "./course-configurator.css";

interface QuizState {
  started: boolean;
  processingComplete: boolean;
  showResults: boolean;
  currentQuestionId: string | null;
  answeredQuestions: number;
  selectedCategoryId: VisualCategoryId | null;
  scores: ScoreMap;
  routingScores: ScoreMap;
  result: QuizResult | null;
}

function createInitialState(): QuizState {
  return {
    started: false,
    processingComplete: false,
    showResults: false,
    currentQuestionId: firstQuestionId ?? null,
    answeredQuestions: 0,
    selectedCategoryId: null,
    scores: {},
    routingScores: {},
    result: null,
  };
}

function ProfileCompanion({
  categoryId,
  layers,
}: {
  categoryId: VisualCategoryId;
  layers: number;
}) {
  const category = getVisualCategory(categoryId);

  return (
    <aside className="profile-companion" style={{ "--category-colour": category.cssColour } as React.CSSProperties}>
      <div className="profile-companion__scene">
        <GlassCubeStage variant="companion" categoryId={categoryId} layers={layers} />
        <span className="profile-companion__icon">
          <CategoryGlyph categoryId={categoryId} size={27} />
        </span>
      </div>
      <div>
        <span className="profile-companion__label">Punkt wyjścia</span>
        <strong>{category.label}</strong>
        <small>{layers}/5 parametrów</small>
      </div>
    </aside>
  );
}

function ResultCourse({
  item,
  primary = false,
}: {
  item: QuizResult["primary"];
  primary?: boolean;
}) {
  const categoryId = item.category.id as VisualCategoryId;
  const visual = getVisualCategory(categoryId);

  return (
    <article
      className={primary ? "result-card result-card--primary" : "result-card"}
      style={{ "--category-colour": visual.cssColour } as React.CSSProperties}
    >
      <span className="result-card__icon">
        <CategoryGlyph categoryId={categoryId} size={primary ? 32 : 25} />
      </span>
      <div className="result-card__copy">
        <p className="result-card__category">{item.category.name}</p>
        <h3>{item.course.name}</h3>
        <a
          className="result-card__link"
          href={item.course.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {courseConfigurator.resultTemplate.cta.label}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="result-card__score">{item.score} pkt</p>
    </article>
  );
}

export default function CourseConfigurator() {
  const [quiz, setQuiz] = useState<QuizState>(createInitialState);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<VisualCategoryId | null>(null);
  const [routingSelection, setRoutingSelection] = useState<VisualCategoryId | null>(null);
  const [pendingRoutingAnswer, setPendingRoutingAnswer] = useState<Answer | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [startHovered, setStartHovered] = useState(false);
  const [startActive, setStartActive] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const panelRef = useRef<HTMLElement>(null);

  const currentQuestion = useMemo<Question | null>(() => {
    return quiz.currentQuestionId ? getQuestion(quiz.currentQuestionId) : null;
  }, [quiz.currentQuestionId]);

  const activeCategoryId = quiz.selectedCategoryId ?? routingSelection;
  const activeVisual = getVisualCategory(activeCategoryId);
  const isProcessing = Boolean(quiz.result && !quiz.processingComplete);

  const commitAnswer = (question: Question, answer: Answer) => {
    setQuiz((current) => {
      const nextScores = addScores(current.scores, answer.scores);
      const nextRoutingScores =
        question.type === "routing"
          ? addScores(current.routingScores, answer.scores)
          : current.routingScores;
      const nextQuestionId = resolveNextQuestionId(question, answer);
      const answeredQuestions = current.answeredQuestions + 1;
      const selectedCategoryId =
        question.type === "routing"
          ? categoryIdByRoutingAnswer[answer.id]
          : current.selectedCategoryId;

      if (!nextQuestionId) {
        return {
          ...current,
          currentQuestionId: null,
          answeredQuestions,
          selectedCategoryId,
          scores: nextScores,
          routingScores: nextRoutingScores,
          result: calculateResult(nextScores, nextRoutingScores),
        };
      }

      return {
        ...current,
        currentQuestionId: nextQuestionId,
        answeredQuestions,
        selectedCategoryId,
        scores: nextScores,
        routingScores: nextRoutingScores,
      };
    });
  };

  const handleStart = () => {
    if (startActive) return;
    setStartActive(true);
    setStartHovered(false);
    setPulseKey((key) => key + 1);
  };

  const completeStart = () => {
    const panel = panelRef.current;
    if (!panel) {
      setQuiz((current) => ({ ...current, started: true }));
      return;
    }
    gsap.to(panel, {
      opacity: 0,
      scale: 0.96,
      y: -14,
      duration: 0.48,
      ease: "power3.in",
      onComplete: () => setQuiz((current) => ({ ...current, started: true })),
    });
  };

  const handleAnswer = (question: Question, answer: Answer) => {
    if (transitioning) return;
    setPulseKey((key) => key + 1);

    if (question.type === "routing") {
      const categoryId = categoryIdByRoutingAnswer[answer.id];
      setTransitioning(true);
      setPendingRoutingAnswer(answer);
      setRoutingSelection(categoryId);
      return;
    }

    setTransitioning(true);
    const panel = panelRef.current;
    if (!panel) {
      commitAnswer(question, answer);
      setTransitioning(false);
      return;
    }

    gsap.to(panel, {
      opacity: 0,
      x: -22,
      filter: "blur(5px)",
      duration: 0.38,
      ease: "power2.in",
      onComplete: () => {
        commitAnswer(question, answer);
        setTransitioning(false);
      },
    });
  };

  const completeRoutingSelection = () => {
    if (!currentQuestion || !pendingRoutingAnswer) return;
    commitAnswer(currentQuestion, pendingRoutingAnswer);
    setPendingRoutingAnswer(null);
    setTransitioning(false);
  };

  const restart = () => {
    setRoutingSelection(null);
    setHoveredCategoryId(null);
    setPendingRoutingAnswer(null);
    setPulseKey(0);
    setTransitioning(false);
    setStartHovered(false);
    setStartActive(false);
    setQuiz(createInitialState());
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.fromTo(
      panel,
      { opacity: 0, x: 22, y: 0, scale: 1, filter: "blur(5px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.72,
        ease: "power3.out",
      },
    );
  }, [quiz.started, quiz.currentQuestionId, quiz.processingComplete, quiz.showResults]);

  let content: React.ReactNode;

  if (!quiz.started) {
    content = (
      <section
        ref={panelRef}
        className="configurator configurator--start"
        aria-labelledby="configurator-start-title"
      >
        <div className="start-compass">
          <NeonCompassStage
            hovered={startHovered}
            active={startActive}
            onComplete={completeStart}
          />
        </div>
        <p className="configurator__eyebrow">Konfigurator kierunku</p>
        <h2 id="configurator-start-title">Znajdź swoją ścieżkę</h2>
        <p className="configurator__start-description">
          Wybierz punkt wyjścia, odpowiedz na pięć pytań i zobacz najlepiej dopasowane kursy.
        </p>
        <button
          className="start-quiz-button"
          type="button"
          disabled={startActive}
          onPointerEnter={() => setStartHovered(true)}
          onPointerLeave={() => setStartHovered(false)}
          onFocus={() => setStartHovered(true)}
          onBlur={() => setStartHovered(false)}
          onClick={handleStart}
        >
          Uruchom konfigurator
          <span aria-hidden="true">→</span>
        </button>
      </section>
    );
  } else if (quiz.result && !quiz.processingComplete && quiz.selectedCategoryId) {
    content = (
      <ProcessingStage
        categoryId={quiz.selectedCategoryId}
        onComplete={() =>
          setQuiz((current) => ({ ...current, processingComplete: true }))
        }
      />
    );
  } else if (quiz.result && !quiz.showResults && quiz.selectedCategoryId) {
    const category = getVisualCategory(quiz.selectedCategoryId);
    content = (
      <section
        ref={panelRef}
        className="configurator configurator--ready"
        aria-labelledby="configurator-complete-title"
      >
        <div className="ready-cube">
          <GlassCubeStage
            variant="companion"
            categoryId={quiz.selectedCategoryId}
            layers={5}
          />
          <span className="ready-cube__icon" style={{ color: category.cssColour }}>
            <CategoryGlyph categoryId={quiz.selectedCategoryId} size={34} />
          </span>
        </div>
        <p className="configurator__eyebrow">Analiza zakończona</p>
        <h2 id="configurator-complete-title">Rekomendacje są gotowe</h2>
        <p className="configurator__start-description">
          Znaleźliśmy cztery kursy najlepiej dopasowane do Twoich odpowiedzi.
        </p>
        <button
          className="show-results-button"
          type="button"
          onClick={() => setQuiz((current) => ({ ...current, showResults: true }))}
        >
          Pokaż wyniki
          <span aria-hidden="true">→</span>
        </button>
      </section>
    );
  } else if (quiz.result) {
    content = (
      <section
        ref={panelRef}
        className="configurator configurator--results"
        aria-labelledby="configurator-result-title"
      >
        <header className="configurator__header result-header">
          <p className="configurator__eyebrow">
            {courseConfigurator.resultTemplate.heading}
          </p>
          <h2 id="configurator-result-title">
            {courseConfigurator.config.primaryResultLabel}
          </h2>
        </header>

        <ResultCourse item={quiz.result.primary} primary />

        {quiz.result.alternatives.length > 0 && (
          <section className="alternatives" aria-labelledby="alternative-results-title">
            <h2 id="alternative-results-title">
              {courseConfigurator.resultTemplate.alternatives.label}
            </h2>
            <div className="alternatives__list">
              {quiz.result.alternatives.map((item) => (
                <ResultCourse key={item.course.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <button className="restart-button" type="button" onClick={restart}>
          Zacznij od nowa
        </button>
      </section>
    );
  } else if (!currentQuestion) {
    content = <p>Brak pytań do wyświetlenia.</p>;
  } else {
    const isRoutingQuestion = currentQuestion.type === "routing";
    const currentStep = isRoutingQuestion ? 0 : quiz.answeredQuestions;
    const totalSteps = courseConfigurator.config.questionsPerSession;
    const progress =
      totalSteps > 1
        ? Math.min(((currentStep - 1) / (totalSteps - 1)) * 100, 100)
        : 100;

    if (isRoutingQuestion) {
      content = (
        <section
          ref={panelRef}
          className="configurator configurator--routing"
          aria-labelledby="current-question-title"
        >
          <header className="configurator__header routing-header">
            <div className="configurator__question-meta">
              <p className="configurator__eyebrow">Pytanie 0 z 5</p>
              <strong className="routing-badge">Decyzja bazowa</strong>
            </div>
            <h2 id="current-question-title">{currentQuestion.question}</h2>
            <p className="routing-description">
              Ten wybór tworzy podstawę konfiguracji i ma największy wpływ na dalsze pytania.
            </p>
          </header>

          <div
            className={routingSelection ? "routing-visual routing-visual--selected" : "routing-visual"}
          >
            <GlassCubeStage
              variant="routing"
              selectedCategoryId={routingSelection}
              hoveredCategoryId={hoveredCategoryId}
              onSelectionComplete={completeRoutingSelection}
            />
            <div className="routing-options">
              {currentQuestion.answers.map((answer, index) => {
                const category = visualCategories[index];
                const selected = routingSelection === category.id;
                return (
                  <button
                    key={answer.id}
                    type="button"
                    disabled={transitioning}
                    className={selected ? "routing-option routing-option--selected" : "routing-option"}
                    style={{ "--category-colour": category.cssColour } as React.CSSProperties}
                    onPointerEnter={() => setHoveredCategoryId(category.id)}
                    onPointerLeave={() => setHoveredCategoryId(null)}
                    onClick={() => handleAnswer(currentQuestion, answer)}
                  >
                    <span className="routing-option__index">0{index + 1}</span>
                    <strong>{category.label}</strong>
                    <small>{answer.label}</small>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="routing-note">Wybrany symbol będzie towarzyszył Ci w kolejnych krokach.</p>
        </section>
      );
    } else {
      content = (
        <section
          ref={panelRef}
          className="configurator configurator--question"
          aria-labelledby="current-question-title"
        >
          {quiz.selectedCategoryId && (
            <ProfileCompanion
              categoryId={quiz.selectedCategoryId}
              layers={Math.max(0, quiz.answeredQuestions - 1)}
            />
          )}
          <header className="configurator__header">
            <div className="configurator__question-meta">
              <p className="configurator__eyebrow">
                Pytanie {currentStep} z {totalSteps}
              </p>
              <span className="question-signal">PARAMETR 0{currentStep}</span>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Postęp konfiguratora"
              aria-valuemin={0}
              aria-valuemax={totalSteps}
              aria-valuenow={currentStep}
            >
              <span className="progress__track" />
              <span
                className="progress__fill"
                style={{ width: `${progress}%`, background: activeVisual.cssColour }}
              />
              <span className="progress__points" aria-hidden="true">
                {Array.from({ length: totalSteps }, (_, index) => {
                  const step = index + 1;
                  const state =
                    step < currentStep
                      ? "progress__point progress__point--complete"
                      : step === currentStep
                        ? "progress__point progress__point--current"
                        : "progress__point";
                  return <span key={step} className={state} />;
                })}
              </span>
            </div>
          </header>

          <h2 id="current-question-title">{currentQuestion.question}</h2>
          <div className="answers">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={answer.id}
                type="button"
                disabled={transitioning}
                onClick={() => handleAnswer(currentQuestion, answer)}
              >
                <span className="answer-index">0{index + 1}</span>
                <span>{answer.label}</span>
                <span className="answer-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>
      );
    }
  }

  return (
    <div className="configurator-app" style={{ "--active-colour": activeVisual.cssColour } as React.CSSProperties}>
      <ConfiguratorEffects
        pulseKey={pulseKey}
        colour={activeVisual.colour}
        processing={isProcessing}
      />
      <div className="configurator-app__content">{content}</div>
    </div>
  );
}
