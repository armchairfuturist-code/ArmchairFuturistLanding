import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';

it('renders without crashing', () => {
  render(<HeroSection />);
  // The component should render without errors
  expect(document.body).toBeInTheDocument();
});

it('renders the assessment link', () => {
  render(<HeroSection />);
  // The assessment link should be present
  expect(screen.getByRole('link', { name: /Get Your Free Score/i })).toBeInTheDocument();
});

it('renders the main headline', () => {
  render(<HeroSection />);
  // The main headline should be present (in sr-only for accessibility)
  expect(screen.getByText(/Trusted Edge Advisor/i)).toBeInTheDocument();
});