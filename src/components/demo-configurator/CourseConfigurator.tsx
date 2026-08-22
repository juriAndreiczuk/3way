import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Certificate, GraduationCap } from "@phosphor-icons/react";
import {
  addScores,
  calculateResult,
  courseConfigurator,
  getCourseType,
  getFirstQuestionId,
  getQuestion,
  getQuestionPathLength,
  resolveNextQuestionId,
} from "../../data/courseConfigurator";
import type {
  Answer,
  CourseType,
  CourseTypeId,
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
  getVisualCategory,
  type VisualCategoryId,
} from "./visualCategories";
import "./course-configurator.css";

interface QuizState {
  started: boolean;
  processingComplete: boolean;
  showResults: boolean;
  selectedCourseTypeId: CourseTypeId | null;
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
    selectedCourseTypeId: null,
    currentQuestionId: null,
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
  totalLayers,
}: {
  categoryId: VisualCategoryId;
  layers: number;
  totalLayers: number;
}) {
  const category = getVisualCategory(categoryId);

  return (
    <aside
      className="profile-companion"
      style={{ "--category-colour": category.cssColour } as React.CSSProperties}
    >
      <div className="profile-companion__scene">
        <GlassCubeStage
          variant="companion"
          categoryId={categoryId}
          layers={layers}
        />
        <span className="profile-companion__icon">
          <CategoryGlyph categoryId={categoryId} size={27} />
        </span>
      </div>
      <div>
        <span className="profile-companion__label">Punkt wyjścia</span>
        <strong>{category.label}</strong>
        <small>
          {layers}/{totalLayers} parametrów
        </small>
      </div>
    </aside>
  );
}

function ResultCourse({
  item,
  ctaLabel,
  primary = false,
}: {
  item: QuizResult["primary"];
  ctaLabel: string;
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
          {ctaLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="result-card__score">{item.score} pkt</p>
    </article>
  );
}

const courseTypeColours: Record<string, string> = {
  podyplomowe: "#a970ff",
  licencjackie: "#20d9ff",
};

const courseTypeEffectColours: Record<string, number> = {
  podyplomowe: 0xa970ff,
  licencjackie: 0x20d9ff,
};

function animateSelection(
  element: HTMLButtonElement,
  colour: string,
  onComplete?: () => void,
) {
  const group = element.closest(
    ".course-type-options, .routing-options, .answers",
  );
  const otherOptions = group
    ? Array.from(group.querySelectorAll<HTMLButtonElement>("button")).filter(
        (option) => option !== element,
      )
    : [];

  gsap.killTweensOf([element, ...otherOptions]);
  gsap
    .timeline({ onComplete })
    .to(
      element,
      {
        filter: "brightness(1.04) saturate(1.06)",
        boxShadow: `inset 0 0 30px ${colour}18, 0 0 16px ${colour}12`,
        borderColor: colour,
        duration: 0.38,
        ease: "power2.out",
      },
      0,
    )
    .to(
      otherOptions,
      {
        opacity: 0.62,
        filter: "grayscale(0.78) saturate(0.3)",
        duration: 0.42,
        ease: "power2.out",
      },
      0,
    )
    .to({}, { duration: 0.48 });
}

function CourseTypeGlyph({
  courseTypeId,
  size = 48,
}: {
  courseTypeId: CourseTypeId;
  size?: number;
}) {
  return courseTypeId === "licencjackie" ? (
    <GraduationCap size={size} weight="duotone" aria-hidden />
  ) : (
    <Certificate size={size} weight="duotone" aria-hidden />
  );
}

function CourseTypeOption({
  courseType,
  index,
  disabled,
  onSelect,
}: {
  courseType: CourseType;
  index: number;
  disabled: boolean;
  onSelect: (courseTypeId: CourseTypeId, element: HTMLButtonElement) => void;
}) {
  const colour = courseTypeColours[courseType.id] ?? "#9b6cff";

  return (
    <button
      type="button"
      className="course-type-card"
      disabled={disabled}
      style={{ "--course-type-colour": colour } as React.CSSProperties}
      onClick={(event) => onSelect(courseType.id, event.currentTarget)}
    >
      <span className="course-type-card__index">0{index + 1}</span>
      <span className="course-type-card__main-icon">
        <CourseTypeGlyph courseTypeId={courseType.id} />
      </span>
      <span className="course-type-card__copy">
        <strong>{courseType.name}</strong>
        <small>5 obszarów · 15 kierunków</small>
      </span>
      <span
        className="course-type-card__categories"
        aria-label="Dostępne obszary"
      >
        {courseType.categories.map((category) => {
          const categoryId = category.id as VisualCategoryId;
          return (
            <span key={category.id} title={category.name}>
              <CategoryGlyph
                categoryId={categoryId}
                size={20}
                weight="regular"
              />
            </span>
          );
        })}
      </span>
      <span className="course-type-card__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}

export default function CourseConfigurator() {
  const [quiz, setQuiz] = useState<QuizState>(createInitialState);
  const [hoveredCategoryId, setHoveredCategoryId] =
    useState<VisualCategoryId | null>(null);
  const [routingSelection, setRoutingSelection] =
    useState<VisualCategoryId | null>(null);
  const [pendingRoutingAnswer, setPendingRoutingAnswer] =
    useState<Answer | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [startHovered, setStartHovered] = useState(false);
  const [startActive, setStartActive] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [effectColour, setEffectColour] = useState(0x9b6cff);
  const effectTargetRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement>(null);

  const activeCourseType = useMemo(() => {
    return quiz.selectedCourseTypeId
      ? getCourseType(quiz.selectedCourseTypeId)
      : null;
  }, [quiz.selectedCourseTypeId]);

  const currentQuestion = useMemo<Question | null>(() => {
    return quiz.selectedCourseTypeId && quiz.currentQuestionId
      ? getQuestion(quiz.selectedCourseTypeId, quiz.currentQuestionId)
      : null;
  }, [quiz.selectedCourseTypeId, quiz.currentQuestionId]);

  const routingCategoryIds = useMemo(() => {
    return (
      activeCourseType?.categories.map(
        (category) => category.id as VisualCategoryId,
      ) ?? []
    );
  }, [activeCourseType]);

  const activeCategoryId = quiz.selectedCategoryId ?? routingSelection;
  const activeVisual = getVisualCategory(activeCategoryId);

  const triggerSelectionEffect = (
    element: HTMLButtonElement,
    colour: number,
  ) => {
    effectTargetRef.current = element;
    setEffectColour(colour);
    setPulseKey((key) => key + 1);
  };
  const resolveRoutingCategory = (
    question: Question,
    answer: Answer,
  ): VisualCategoryId | null => {
    const answerIndex = question.answers.findIndex(
      (candidate) => candidate.id === answer.id,
    );
    const categoryId = activeCourseType?.categories[answerIndex]?.id;
    return categoryId ? (categoryId as VisualCategoryId) : null;
  };

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
          ? resolveRoutingCategory(question, answer)
          : current.selectedCategoryId;

      if (!nextQuestionId) {
        return {
          ...current,
          currentQuestionId: null,
          answeredQuestions,
          selectedCategoryId,
          scores: nextScores,
          routingScores: nextRoutingScores,
          result: current.selectedCourseTypeId
            ? calculateResult(
                current.selectedCourseTypeId,
                nextScores,
                nextRoutingScores,
              )
            : null,
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

  const selectCourseType = (
    courseTypeId: CourseTypeId,
    element: HTMLButtonElement,
  ) => {
    if (transitioning) return;
    setTransitioning(true);
    triggerSelectionEffect(
      element,
      courseTypeEffectColours[courseTypeId] ?? 0x9b6cff,
    );

    const applySelection = () => {
      setQuiz((current) => ({
        ...current,
        selectedCourseTypeId: courseTypeId,
        currentQuestionId: getFirstQuestionId(courseTypeId),
      }));
      setTransitioning(false);
    };

    animateSelection(
      element,
      courseTypeColours[courseTypeId] ?? "#9b6cff",
      () => {
        const panel = panelRef.current;
        if (!panel) {
          applySelection();
          return;
        }

        gsap.to(panel, {
          opacity: 0,
          scale: 0.97,
          y: -12,
          filter: "blur(5px)",
          duration: 0.42,
          ease: "power2.in",
          onComplete: applySelection,
        });
      },
    );
  };

  const handleAnswer = (
    question: Question,
    answer: Answer,
    element: HTMLButtonElement,
  ) => {
    if (transitioning) return;

    if (question.type === "routing") {
      const categoryId = resolveRoutingCategory(question, answer);
      if (!categoryId) return;
      const category = getVisualCategory(categoryId);
      triggerSelectionEffect(element, category.colour);
      setTransitioning(true);
      setPendingRoutingAnswer(answer);
      setRoutingSelection(categoryId);
      animateSelection(element, category.cssColour);
      return;
    }

    triggerSelectionEffect(element, activeVisual.colour);
    setTransitioning(true);
    animateSelection(element, activeVisual.cssColour, () => {
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
    });
  };

  const completeRoutingSelection = () => {
    if (!currentQuestion || !pendingRoutingAnswer) return;
    commitAnswer(currentQuestion, pendingRoutingAnswer);
    setPendingRoutingAnswer(null);
    setTransitioning(false);
  };

  const returnToCourseTypeSelection = () => {
    if (transitioning) return;
    setTransitioning(true);

    const resetCourseType = () => {
      setRoutingSelection(null);
      setHoveredCategoryId(null);
      setPendingRoutingAnswer(null);
      setQuiz({ ...createInitialState(), started: true });
      setTransitioning(false);
    };

    const panel = panelRef.current;
    if (!panel) {
      resetCourseType();
      return;
    }

    gsap.to(panel, {
      opacity: 0,
      y: 12,
      filter: "blur(5px)",
      duration: 0.38,
      ease: "power2.in",
      onComplete: resetCourseType,
    });
  };

  const restart = () => {
    setRoutingSelection(null);
    setHoveredCategoryId(null);
    setPendingRoutingAnswer(null);
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
  }, [
    quiz.started,
    quiz.selectedCourseTypeId,
    quiz.currentQuestionId,
    quiz.processingComplete,
    quiz.showResults,
  ]);

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
          Wybierz rodzaj studiów, określ swój punkt wyjścia i zobacz najlepiej
          dopasowane kierunki.
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
  } else if (!activeCourseType) {
    content = (
      <section
        ref={panelRef}
        className="configurator configurator--course-types"
        aria-labelledby="course-type-title"
      >
        <header className="configurator__header course-type-header">
          <p className="configurator__eyebrow">Etap 01 · Rodzaj studiów</p>
          <h2 id="course-type-title">
            {courseConfigurator.config.courseTypeSelectionTitle}
          </h2>
          <p>
            Każda ścieżka ma własne obszary, pytania i niezależny zestaw
            rekomendacji.
          </p>
        </header>
        <div className="course-type-options">
          {courseConfigurator.courseTypes.map((courseType, index) => (
            <CourseTypeOption
              key={courseType.id}
              courseType={courseType}
              index={index}
              disabled={transitioning}
              onSelect={selectCourseType}
            />
          ))}
        </div>
        <p className="course-type-note">
          Wybrany rodzaj studiów określi dalszy przebieg konfiguratora.
        </p>
      </section>
    );
  } else if (
    quiz.result &&
    !quiz.processingComplete &&
    quiz.selectedCategoryId
  ) {
    content = (
      <ProcessingStage
        categoryId={quiz.selectedCategoryId}
        answerCount={quiz.answeredQuestions}
        courseCount={activeCourseType.courses.length}
        areaCount={activeCourseType.categories.length}
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
          <span
            className="ready-cube__icon"
            style={{ color: category.cssColour }}
          >
            <CategoryGlyph categoryId={quiz.selectedCategoryId} size={34} />
          </span>
        </div>
        <p className="configurator__eyebrow">Analiza zakończona</p>
        <h2 id="configurator-complete-title">Rekomendacje są gotowe</h2>
        <p className="configurator__start-description">
          Znaleźliśmy cztery propozycje najlepiej dopasowane do Twoich
          odpowiedzi.
        </p>
        <button
          className="show-results-button"
          type="button"
          onClick={() =>
            setQuiz((current) => ({ ...current, showResults: true }))
          }
        >
          Pokaż wyniki
          <span aria-hidden="true">→</span>
        </button>
      </section>
    );
  } else if (quiz.result && activeCourseType) {
    content = (
      <section
        ref={panelRef}
        className="configurator configurator--results"
        aria-labelledby="configurator-result-title"
      >
        <header className="configurator__header result-header">
          <p className="configurator__eyebrow">
            {activeCourseType.resultTemplate.heading}
          </p>
          <h2 id="configurator-result-title">
            {activeCourseType.config.primaryResultLabel}
          </h2>
        </header>

        <ResultCourse
          item={quiz.result.primary}
          ctaLabel={activeCourseType.resultTemplate.cta.label}
          primary
        />

        {quiz.result.alternatives.length > 0 && (
          <section
            className="alternatives"
            aria-labelledby="alternative-results-title"
          >
            <h2 id="alternative-results-title">
              {activeCourseType.resultTemplate.alternatives.label}
            </h2>
            <div className="alternatives__list">
              {quiz.result.alternatives.map((item) => (
                <ResultCourse
                  key={item.course.id}
                  item={item}
                  ctaLabel={activeCourseType.resultTemplate.cta.label}
                />
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
    const totalSteps = isRoutingQuestion
      ? getQuestionPathLength(
          activeCourseType.id,
          currentQuestion.answers[0]?.nextQuestionId ?? null,
        )
      : Math.max(
          currentStep,
          Math.max(0, quiz.answeredQuestions - 1) +
            getQuestionPathLength(activeCourseType.id, currentQuestion.id),
        );
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
              <p className="configurator__eyebrow">Pytanie 0 z {totalSteps}</p>
              <strong className="routing-badge">Decyzja bazowa</strong>
            </div>
            <h2 id="current-question-title">{currentQuestion.question}</h2>
            <p className="routing-description">
              Ten wybór tworzy podstawę konfiguracji i ma największy wpływ na
              dalsze pytania.
            </p>
          </header>

          <div
            className={
              routingSelection
                ? "routing-visual routing-visual--selected"
                : "routing-visual"
            }
          >
            <GlassCubeStage
              variant="routing"
              categoryIds={routingCategoryIds}
              selectedCategoryId={routingSelection}
              hoveredCategoryId={hoveredCategoryId}
              onSelectionComplete={completeRoutingSelection}
            />
            <div className="routing-options">
              {currentQuestion.answers.map((answer, index) => {
                const categoryData = activeCourseType.categories[index];
                const category = getVisualCategory(
                  categoryData?.id as VisualCategoryId,
                );
                const selected = routingSelection === category.id;
                return (
                  <button
                    key={answer.id}
                    type="button"
                    disabled={transitioning}
                    className={
                      selected
                        ? "routing-option routing-option--selected"
                        : "routing-option"
                    }
                    style={
                      {
                        "--category-colour": category.cssColour,
                      } as React.CSSProperties
                    }
                    onPointerEnter={() => setHoveredCategoryId(category.id)}
                    onPointerLeave={() => setHoveredCategoryId(null)}
                    onClick={(event) =>
                      handleAnswer(currentQuestion, answer, event.currentTarget)
                    }
                  >
                    <span className="routing-option__index">0{index + 1}</span>
                    <strong>{categoryData?.name ?? category.label}</strong>
                    <small>{answer.label}</small>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="routing-note">
            Wybrany obszar będzie miał wływ na zestaw pytań.
          </p>
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
              totalLayers={totalSteps}
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
                style={{
                  width: `${progress}%`,
                  background: activeVisual.cssColour,
                }}
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
          <div className="answers" key={currentQuestion.id}>
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={answer.id}
                type="button"
                disabled={transitioning}
                onClick={(event) =>
                  handleAnswer(currentQuestion, answer, event.currentTarget)
                }
              >
                <span className="answer-index">0{index + 1}</span>
                <span>{answer.label}</span>
                <span className="answer-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>
      );
    }
  }

  const showCourseTypeBackButton = Boolean(
    quiz.started && activeCourseType && currentQuestion && !quiz.result,
  );

  return (
    <>
      {!quiz.started && (
        <header className="configurator-page-header">
          <h1>{courseConfigurator.config.title}</h1>
          <p>{courseConfigurator.config.description}</p>
        </header>
      )}
      {quiz.started && activeCourseType && (
        <div
          className="selected-course-type-emblem"
          style={
            {
              "--course-type-colour":
                courseTypeColours[activeCourseType.id] ?? "#9b6cff",
            } as React.CSSProperties
          }
          role="img"
          aria-label={`Wybrano: ${activeCourseType.name}`}
        >
          <span className="selected-course-type-emblem__lens">
            <CourseTypeGlyph courseTypeId={activeCourseType.id} size={34} />
          </span>
        </div>
      )}
      <div
        className="configurator-app"
        style={
          { "--active-colour": activeVisual.cssColour } as React.CSSProperties
        }
      >
        <ConfiguratorEffects
          pulseKey={pulseKey}
          colour={effectColour}
          target={effectTargetRef.current}
        />
        <div className="configurator-app__content">{content}</div>
        {showCourseTypeBackButton && (
          <div className="course-type-back-navigation">
            <button
              className="course-type-back-button"
              type="button"
              disabled={transitioning}
              onClick={returnToCourseTypeSelection}
            >
              <span aria-hidden="true">←</span>
              Wróć do wyboru rodzaju studiów
            </button>
          </div>
        )}
      </div>
    </>
  );
}
