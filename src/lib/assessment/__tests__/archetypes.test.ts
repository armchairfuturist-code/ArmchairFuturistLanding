import { describe, it, expect } from 'vitest';
import { getArchetypeBySlug, archetypes, ARCHETYPE_SLUGS } from '../archetypes';

describe('getArchetypeBySlug', () => {
  it('returns an archetype for each known slug', () => {
    for (const slug of ARCHETYPE_SLUGS) {
      const archetype = getArchetypeBySlug(slug);
      expect(archetype).toBeDefined();
      expect(archetype!.slug).toBe(slug);
    }
  });

  it('returns undefined for unknown slug', () => {
    expect(getArchetypeBySlug('nonexistent')).toBeUndefined();
  });

  it('each archetype has required fields', () => {
    for (const a of archetypes) {
      expect(a.name).toBeTruthy();
      expect(a.headline).toBeTruthy();
      expect(a.diagnosis.length).toBeGreaterThan(0);
      expect(a.primaryCta.label).toBeTruthy();
      expect(a.primaryCta.href).toBeTruthy();
    }
  });
});
