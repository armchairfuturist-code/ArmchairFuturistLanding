import { describe, it, expect } from "vitest";
import {
  createInitialAssessmentState,
  reduceAssessmentFlow,
  resolveResultScores,
  totalQuestions,
  buildResultPath,
} from "@/lib/assessment/flow";
import { questions } from "@/lib/assessment/config";

describe("Assessment Flow", () => {
  it("starts in landing with empty answers", () => {
    const state = createInitialAssessmentState();
    expect(state.phase).toBe("landing");
    expect(state.answerIndices).toEqual([]);
    expect(state.currentQuestion).toBe(0);
    expect(state.resultScores).toBeNull();
  });

  it("START moves to quiz", () => {
    const state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
    });
    expect(state.phase).toBe("quiz");
    expect(state.currentQuestion).toBe(0);
  });

  it("START with a valid draft resumes at the saved question", () => {
    const state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
      resume: { currentQuestion: 3, answerIndices: [0, 1, 2] },
    });
    expect(state.phase).toBe("quiz");
    expect(state.currentQuestion).toBe(3);
    expect(state.answerIndices).toEqual([0, 1, 2]);
  });

  it("START ignores a draft whose answer count mismatches the question", () => {
    const state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
      resume: { currentQuestion: 3, answerIndices: [0, 1] },
    });
    expect(state.currentQuestion).toBe(0);
    expect(state.answerIndices).toEqual([]);
  });

  it("START ignores a draft with an out-of-range option index", () => {
    const badIndex = questions[1].answers.length; // one past the second question's options
    const state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
      resume: { currentQuestion: 2, answerIndices: [0, badIndex] },
    });
    expect(state.currentQuestion).toBe(0);
    expect(state.answerIndices).toEqual([]);
  });

  it("ANSWER advances questions using a single index representation", () => {
    let state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
    });
    state = reduceAssessmentFlow(state, { type: "ANSWER", optionIndex: 0 });
    expect(state.phase).toBe("quiz");
    expect(state.currentQuestion).toBe(1);
    expect(state.answerIndices).toEqual([0]);
  });

  it("BACK undoes the last answer", () => {
    let state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
    });
    state = reduceAssessmentFlow(state, { type: "ANSWER", optionIndex: 1 });
    state = reduceAssessmentFlow(state, { type: "BACK" });
    expect(state.currentQuestion).toBe(0);
    expect(state.answerIndices).toEqual([]);
  });

  it("completing all questions scores and moves to email", () => {
    let state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
    });

    for (let i = 0; i < questions.length; i++) {
      state = reduceAssessmentFlow(state, { type: "ANSWER", optionIndex: 0 });
    }

    expect(state.phase).toBe("email");
    expect(state.answerIndices).toHaveLength(questions.length);
    expect(state.resultSlug).toBeTruthy();
    expect(state.resultScores).not.toBeNull();
    expect(state.resultScores!.clarity).toBeGreaterThanOrEqual(0);
    expect(state.resultScores!.clarity).toBeLessThanOrEqual(100);
  });

  it("rejects out-of-range option indices", () => {
    let state = reduceAssessmentFlow(createInitialAssessmentState(), {
      type: "START",
    });
    const before = state;
    state = reduceAssessmentFlow(state, { type: "ANSWER", optionIndex: 99 });
    expect(state).toEqual(before);
  });

  it("BEGIN_REDIRECT requires a result", () => {
    let state = createInitialAssessmentState();
    state = reduceAssessmentFlow(state, { type: "BEGIN_REDIRECT" });
    expect(state.phase).toBe("landing");
  });

  it("totalQuestions matches config", () => {
    expect(totalQuestions()).toBe(questions.length);
  });

  it("resolveResultScores prefers stored session over URL", () => {
    const scores = resolveResultScores({
      slug: "url-slug",
      searchParams: new URLSearchParams("c=10&r=20&u=30&i=1"),
      stored: {
        archetypeSlug: "stored-slug",
        scores: {
          clarity: 70,
          readiness: 60,
          urgency: 50,
          individualSignals: 2,
        },
      },
    });
    expect(scores.archetypeSlug).toBe("stored-slug");
    expect(scores.clarity).toBe(70);
    expect(scores.individualSignals).toBe(2);
  });

  it("resolveResultScores falls back to URL params", () => {
    const scores = resolveResultScores({
      slug: "from-url",
      searchParams: new URLSearchParams("c=11&r=22&u=33&i=4"),
      stored: null,
    });
    expect(scores.archetypeSlug).toBe("from-url");
    expect(scores.clarity).toBe(11);
    expect(scores.readiness).toBe(22);
    expect(scores.urgency).toBe(33);
    expect(scores.individualSignals).toBe(4);
  });

  it("buildResultPath encodes compact query params", () => {
    const path = buildResultPath("explorer", {
      clarity: 70,
      readiness: 55,
      urgency: 40,
      individualSignals: 1,
    });
    expect(path).toContain("/assessment/result/explorer?");
    expect(path).toContain("c=70");
    expect(path).toContain("r=55");
    expect(path).toContain("u=40");
    expect(path).toContain("i=1");
  });
});
