import rawConfigurator from "../content/configurator.json";
import type {
  Answer,
  CourseConfiguratorData,
  Question,
  QuestionId,
  QuizResult,
  ScoreMap,
} from "../types/courseConfigurator";

export const courseConfigurator = rawConfigurator as CourseConfiguratorData;

const questionsById = new Map(
  courseConfigurator.questions.map((question) => [question.id, question]),
);

const categoriesById = new Map(
  courseConfigurator.categories.map((category) => [category.id, category]),
);

export const firstQuestionId = courseConfigurator.questions[0]?.id;

export function getQuestion(questionId: QuestionId): Question {
  const question = questionsById.get(questionId);

  if (!question) {
    throw new Error(`Unknown configurator question: ${questionId}`);
  }

  return question;
}

export function resolveNextQuestionId(
  question: Question,
  answer: Answer,
): QuestionId | null {
  return answer.nextQuestionId ?? question.nextQuestionId ?? null;
}

export function addScores(current: ScoreMap, added: ScoreMap): ScoreMap {
  const nextScores: ScoreMap = { ...current };

  for (const [courseId, points] of Object.entries(added)) {
    nextScores[courseId] = (nextScores[courseId] ?? 0) + (points ?? 0);
  }

  return nextScores;
}

export function calculateResult(
  scores: ScoreMap,
  routingScores: ScoreMap,
): QuizResult {
  const rankedCourses = courseConfigurator.courses
    .map((course, originalIndex) => {
      const category = categoriesById.get(course.categoryId);

      if (!category) {
        throw new Error(`Unknown category for course: ${course.id}`);
      }

      return {
        course,
        category,
        score: scores[course.id] ?? 0,
        routingScore: routingScores[course.id] ?? 0,
        originalIndex,
      };
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.routingScore - left.routingScore ||
        left.originalIndex - right.originalIndex,
    )
    .slice(0, courseConfigurator.config.resultsLimit)
    .map(({ course, category, score }) => ({ course, category, score }));

  const [primary, ...alternatives] = rankedCourses;

  if (!primary) {
    throw new Error("The configurator must contain at least one course");
  }

  return {
    primary,
    alternatives: alternatives.slice(
      0,
      courseConfigurator.resultLogic.alternativeResults,
    ),
  };
}
