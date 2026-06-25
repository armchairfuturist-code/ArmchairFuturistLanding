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
  // The hero's primary action links to WhatsApp
  expect(screen.getByRole('link', { name: /Message Alex on WhatsApp/i })).toBeInTheDocument();
});

it('renders the secondary CTA link', () => {
  render(<HeroSection />);
  // The secondary CTA scrolls to the services section
  expect(
    screen.getByRole('link', { name: /See Programs/i }),
  ).toBeInTheDocument();
});

it('renders an accessible h1 with the brand summary', () => {
  render(<HeroSection />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /AI Won't Replace You/i,
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
