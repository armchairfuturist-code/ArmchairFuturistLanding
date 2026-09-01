import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import AssessmentCtaSection from "@/components/sections/AssessmentCtaSection";
import { questions } from "@/lib/assessment/config";
import {
  ASSESSMENT_QUIZ_DRAFT_KEY,
  type QuizDraft,
} from "@/lib/assessment/quiz-session";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
  trackConversion: vi.fn(),
}));

const firstQuestion = questions[0];

function readDraft(): QuizDraft | null {
  const raw = sessionStorage.getItem(ASSESSMENT_QUIZ_DRAFT_KEY);
  return raw ? (JSON.parse(raw) as QuizDraft) : null;
}

describe("AssessmentCtaSection teaser", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it("renders the live first question with radio-group options", () => {
    render(<AssessmentCtaSection />);
    expect(screen.getByText(firstQuestion.text)).toBeInTheDocument();
    const group = screen.getByRole("radiogroup");
    const radios = within(group).getAllByRole("radio");
    expect(radios).toHaveLength(firstQuestion.answers.length);
    expect(radios[0]).toHaveAttribute("tabIndex", "0");
  });

  it("seeds the quiz draft at question 2 and shows the reaction on answer", async () => {
    const user = userEvent.setup();
    render(<AssessmentCtaSection />);

    await user.click(screen.getByRole("radio", { name: /pilots running/i }));

    expect(readDraft()).toEqual({ currentQuestion: 1, answerIndices: [2] });
    expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
    expect(document.querySelector('[aria-live="polite"]')).not.toBeNull();
    expect(
      screen.getByRole("link", { name: /see your full score/i }),
    ).toHaveAttribute("href", "/assessment");
    expect(
      screen.getByText(new RegExp(`${questions.length - 1} questions left`)),
    ).toBeInTheDocument();
  });

  it("restores the reaction state when a draft already exists", () => {
    sessionStorage.setItem(
      ASSESSMENT_QUIZ_DRAFT_KEY,
      JSON.stringify({ currentQuestion: 1, answerIndices: [1] }),
    );
    render(<AssessmentCtaSection />);
    expect(document.querySelector('[aria-live="polite"]')).not.toBeNull();
    expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
  });

  it("allows changing the answer and updates the draft", async () => {
    sessionStorage.setItem(
      ASSESSMENT_QUIZ_DRAFT_KEY,
      JSON.stringify({ currentQuestion: 1, answerIndices: [1] }),
    );
    const user = userEvent.setup();
    render(<AssessmentCtaSection />);

    await user.click(screen.getByText(/change answer/i));
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: /figuring this out/i }));
    expect(readDraft()).toEqual({ currentQuestion: 1, answerIndices: [3] });
    expect(document.querySelector('[aria-live="polite"]')).not.toBeNull();
  });
});
