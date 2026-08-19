import { useMemo, useState } from "react";
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
import "./course-configurator.css";

interface QuizState {
  started: boolean;
  showResults: boolean;
  currentQuestionId: string | null;
  answeredQuestions: number;
  scores: ScoreMap;
  routingScores: ScoreMap;
  result: QuizResult | null;
}

function createInitialState(): QuizState {
  return {
    started: false,
    showResults: false,
    currentQuestionId: firstQuestionId ?? null,
    answeredQuestions: 0,
    scores: {},
    routingScores: {},
    result: null,
  };
}

function ResultCourse({
  item,
  primary = false,
}: {
  item: QuizResult["primary"];
  primary?: boolean;
}) {
  return (
    <article
      className={primary ? "result-card result-card--primary" : "result-card"}
    >
      <p className="result-card__category">{item.category.name}</p>
      <h3>{item.course.name}</h3>
      <p className="result-card__score">{item.score} pkt</p>
      <a
        className="result-card__link"
        href={item.course.link}
        target="_blank"
        rel="noreferrer noopener"
      >
        {courseConfigurator.resultTemplate.cta.label}
      </a>
    </article>
  );
}

export default function CourseConfigurator() {
  const [quiz, setQuiz] = useState<QuizState>(createInitialState);

  const currentQuestion = useMemo<Question | null>(() => {
    return quiz.currentQuestionId ? getQuestion(quiz.currentQuestionId) : null;
  }, [quiz.currentQuestionId]);

  const answerQuestion = (answer: Answer) => {
    if (!currentQuestion) return;

    setQuiz((current) => {
      const nextScores = addScores(current.scores, answer.scores);
      const nextRoutingScores =
        currentQuestion.type === "routing"
          ? addScores(current.routingScores, answer.scores)
          : current.routingScores;
      const nextQuestionId = resolveNextQuestionId(currentQuestion, answer);
      const answeredQuestions = current.answeredQuestions + 1;

      if (!nextQuestionId) {
        return {
          ...current,
          currentQuestionId: null,
          answeredQuestions,
          scores: nextScores,
          routingScores: nextRoutingScores,
          result: calculateResult(nextScores, nextRoutingScores),
        };
      }

      return {
        ...current,
        currentQuestionId: nextQuestionId,
        answeredQuestions,
        scores: nextScores,
        routingScores: nextRoutingScores,
      };
    });
  };

  if (!quiz.started) {
    return (
      <section
        className="configurator configurator--start"
        aria-labelledby="configurator-start-title"
      >
        <p className="configurator__eyebrow">Twój następny krok</p>
        <h2 id="configurator-start-title">Znajdź swoją ścieżkę</h2>
        <p className="configurator__start-description">
          Odpowiedz na kilka pytań i sprawdź, które kierunki najlepiej pasują do
          Ciebie.
        </p>
        <button
          className="start-quiz-button"
          type="button"
          onClick={() => setQuiz((current) => ({ ...current, started: true }))}
        >
          Rozpocznij
        </button>
      </section>
    );
  }

  if (quiz.result && !quiz.showResults) {
    return (
      <section
        className="configurator configurator--start"
        aria-labelledby="configurator-complete-title"
      >
        <p className="configurator__eyebrow">Gotowe</p>
        <h2 id="configurator-complete-title">Konfigurator ukończony</h2>
        <p className="configurator__start-description">
          Twoje odpowiedzi zostały podsumowane. Sprawdź dopasowane kierunki i
          kursy.
        </p>
        <button
          className="show-results-button"
          type="button"
          onClick={() =>
            setQuiz((current) => ({ ...current, showResults: true }))
          }
        >
          Pokaż wyniki
        </button>
      </section>
    );
  }

  if (quiz.result) {
    return (
      <section
        className="configurator"
        aria-labelledby="configurator-result-title"
      >
        <header className="configurator__header">
          <p className="configurator__eyebrow">
            {courseConfigurator.resultTemplate.heading}
          </p>
          <h2 id="configurator-result-title">
            {courseConfigurator.config.primaryResultLabel}
          </h2>
        </header>

        <ResultCourse item={quiz.result.primary} primary />

        {quiz.result.alternatives.length > 0 && (
          <section
            className="alternatives"
            aria-labelledby="alternative-results-title"
          >
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

        <button
          className="restart-button"
          type="button"
          onClick={() => setQuiz(createInitialState())}
        >
          Zacznij od nowa
        </button>
      </section>
    );
  }

  if (!currentQuestion) {
    return <p>Brak pytań do wyświetlenia.</p>;
  }

  const isRoutingQuestion = currentQuestion.type === "routing";
  const currentStep = isRoutingQuestion ? 0 : quiz.answeredQuestions;
  const totalSteps = courseConfigurator.config.questionsPerSession;
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <section
      className={
        isRoutingQuestion
          ? "configurator configurator--routing"
          : "configurator"
      }
      aria-labelledby="current-question-title"
    >
      <header className="configurator__header">
        <div className="configurator__question-meta">
          <p className="configurator__eyebrow my-2">
            Pytanie {currentStep} z {totalSteps}
          </p>
          {isRoutingQuestion && (
            <strong className="routing-badge my-2">Pytanie wstępne</strong>
          )}
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Postęp konfiguratora"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={currentStep}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </header>

      <h2 id="current-question-title">{currentQuestion.question}</h2>

      {isRoutingQuestion && (
        <p className="routing-description">
          Ten wybór ma szczególnie duży wpływ na końcowe dopasowanie.
        </p>
      )}

      <div className="answers">
        {currentQuestion.answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            onClick={() => answerQuestion(answer)}
          >
            {answer.label}
          </button>
        ))}
      </div>
    </section>
  );
}
