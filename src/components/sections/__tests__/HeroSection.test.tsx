import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';

it('renders without crashing', () => {
  render(<HeroSection />);
  // The component should render without errors
  expect(document.body).toBeInTheDocument();
});

it('renders the primary CTA link', () => {
  render(<HeroSection />);
  // The hero's primary action links to the calendar
  expect(screen.getByRole('link', { name: /Start Building Today/i })).toBeInTheDocument();
});

it('renders the secondary CTA link', () => {
  render(<HeroSection />);
  // The secondary CTA scrolls to the services section
  expect(
    screen.getByRole('link', { name: /See My Mentorship Programs/i }),
  ).toBeInTheDocument();
});

it('renders an accessible h1 with the brand summary', () => {
  render(<HeroSection />);
  // The sr-only h1 carries the full brand summary for screen readers / SEO
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /AI Literacy Mentor/i,
    }),
  ).toBeInTheDocument();
});

it('renders the main headline text', () => {
  render(<HeroSection />);
  // The pull-up animation splits each line into per-word <span>s, so we
  // assert by word rather than by a single contiguous string. Pick words
  // unique to each line to avoid matching the shared "AI" / "You".
  for (const word of ['Won’t', 'Replace', 'Someone', 'Using', 'Better', 'Will.']) {
    expect(screen.getByText(word)).toBeInTheDocument();
  }
});
it('italicizes the pivot word "Better" for editorial emphasis', () => {
  render(<HeroSection />);
  // The "Better" word carries the `italic` class to land the rhetorical pivot
  // in the second line of the headline.
  const better = screen.getByText('Better');
  expect(better).toBeInTheDocument();
  expect(better.className).toMatch(/\bitalic\b/);
});
