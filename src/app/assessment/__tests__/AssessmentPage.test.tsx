import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssessmentPage from '@/app/assessment/page';
import { questions } from '@/lib/assessment/config';

// Mock dependencies
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
  trackConversion: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/components/assessment/QuizProgress', () => ({
  default: ({ current, total }: { current: number; total: number }) => (
    <div data-testid="quiz-progress">
      Question {current} of {total}
    </div>
  ),
}));

vi.mock('@/components/assessment/QuizQuestion', () => ({
  default: ({ question, onAnswer, questionIndex }: any) => (
    <div data-testid="quiz-question">
      <h3>{question.text}</h3>
      <button onClick={() => onAnswer(question.answers[0])}>
        Yes
      </button>
    </div>
  ),
}));

vi.mock('@/components/assessment/EmailCapture', () => ({
  default: ({ onComplete }: { onComplete: () => void }) => {
    const [email, setEmail] = React.useState('');
    const [invalid, setInvalid] = React.useState(false);
    return (
      <div data-testid="email-capture">
        <input
          data-testid="email-input"
          type="email"
          placeholder="email@example.com"
          aria-invalid={invalid}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setInvalid(false); }}
        />
        <button onClick={() => { if (!email) { setInvalid(true); return; } onComplete(); }}>Submit</button>
      </div>
    );
  },
}));

describe('AssessmentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders landing phase initially', () => {
    render(<AssessmentPage />);
    expect(screen.getByText(/How Ready Are You for AI\?/i)).toBeInTheDocument();
    expect(screen.getByText(/See My AI Readiness/i)).toBeInTheDocument();
  });

  it('transitions to quiz phase after clicking Start', async () => {
    const user = userEvent.setup();
    render(<AssessmentPage />);

    const startButton = screen.getByText(/See My AI Readiness/i);
    await user.click(startButton);

    expect(screen.getByTestId('quiz-progress')).toBeInTheDocument();
    expect(screen.getByText(/Question 1 of 9/i)).toBeInTheDocument();
  });

  it('sends analytics event when starting quiz', async () => {
    const { trackEvent } = await import('@/lib/analytics');
    const user = userEvent.setup();
    render(<AssessmentPage />);

    const startButton = screen.getByText(/See My AI Readiness/i);
    await user.click(startButton);

    expect(trackEvent).toHaveBeenCalledWith('assessment_start');
  });

  it('allows answering quiz questions', async () => {
    const user = userEvent.setup();
    render(<AssessmentPage />);

    // Start quiz
    const startButton = screen.getByText(/See My AI Readiness/i);
    await user.click(startButton);

    // Answer question
    const questionText = screen.getByText(questions[0].text);
    expect(questionText).toBeInTheDocument();

    const answerButton = screen.getByText('Yes');
    await user.click(answerButton);

    // Should show next question
    await waitFor(() => {
      expect(screen.getByText(/Question 2 of 9/i)).toBeInTheDocument();
    });
  });

  it('validates email input before proceeding', async () => {
    const { trackConversion } = await import('@/lib/analytics');
    const user = userEvent.setup();
    render(<AssessmentPage />);

    // Start quiz
    const startButton = screen.getByText(/See My AI Readiness/i);
    await user.click(startButton);

    // Answer all questions (9 questions total)
    for (let i = 0; i < 9; i++) {
      await user.click(screen.getByText('Yes'));
      // Wait for next question to appear
      await waitFor(() => {
        const hasQuiz = screen.queryByTestId('quiz-question');
        const hasEmail = screen.queryByTestId('email-capture');
        expect(hasQuiz ?? hasEmail).toBeInTheDocument();
      });
    }

    // Verify email input is present
    expect(screen.getByTestId('email-input')).toBeInTheDocument();

    // Submit empty email (should fail)
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    // Email input should be visible and invalid
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });
});