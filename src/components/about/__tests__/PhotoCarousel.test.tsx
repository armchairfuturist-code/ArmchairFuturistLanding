import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotoCarousel from '../PhotoCarousel';

const photos = [
  { src: '/a.jpg', alt: 'First', caption: 'First caption' },
  { src: '/b.jpg', alt: 'Second', caption: 'Second caption' },
];

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('motion/react', async () => {
  const actual = await vi.importActual<typeof import('motion/react')>('motion/react');
  return { ...actual, useReducedMotion: () => false, motion: { div: 'div' } };
});

// `drag` on a plain div is dropped by the mock — the index logic is what we test.

describe('PhotoCarousel', () => {
  it('starts on the first photo and steps through arrows and dots', () => {
    render(<PhotoCarousel photos={photos} />);
    expect(screen.getByText('First caption')).toBeDefined();
    expect(screen.getByText('01 / 02')).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
    expect(screen.getByText('02 / 02')).toBeDefined();
    expect(screen.getByText('Second caption')).toBeDefined();

    // Last slide: next is disabled, dots jump back
    const next = screen.getByRole('button', { name: 'Next photo' }) as HTMLButtonElement;
    expect(next.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Go to photo 1' }));
    expect(screen.getByText('01 / 02')).toBeDefined();
  });

  it('keeps a carousel label and per-slide alt text', () => {
    render(<PhotoCarousel photos={photos} />);
    expect(screen.getByRole('group', { name: 'Photos of Alex leading sessions and workshops' })).toBeDefined();
    expect(screen.getByAltText('First')).toBeDefined();
    expect(screen.getByAltText('Second')).toBeDefined();
  });
});
