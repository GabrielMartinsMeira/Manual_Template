import { getManualMetadata, getSection, ALLOWED_LANGS, ALLOWED_TYPES } from '../src/lib/mdx';

describe('mdx.js', () => {
  describe('getManualMetadata', () => {
    it('returns empty array for invalid language', () => {
      const result = getManualMetadata('fr', 'manual-main');
      expect(result).toEqual([]);
    });

    it('returns empty array for invalid type', () => {
      const result = getManualMetadata('pt', 'invalid-type');
      expect(result).toEqual([]);
    });

    it('returns array of metadata for valid inputs (pt, manual-main)', () => {
      const result = getManualMetadata('pt', 'manual-main');
      expect(Array.isArray(result)).toBe(true);
      // We know there should be some files
      expect(result.length).toBeGreaterThan(0);
      
      // Check structure of a returned item
      const firstItem = result[0];
      expect(firstItem).toHaveProperty('slug');
      expect(firstItem).toHaveProperty('title');
      expect(firstItem).toHaveProperty('order');
      expect(firstItem).toHaveProperty('group');
      expect(firstItem).not.toHaveProperty('content'); // includeContent is false by default
    });

    it('orders sections correctly', () => {
      const result = getManualMetadata('pt', 'manual-main');
      if (result.length > 1) {
        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i].order).toBeLessThanOrEqual(result[i + 1].order);
        }
      }
    });

    it('includes content when requested', () => {
      const result = getManualMetadata('pt', 'manual-main', true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('content');
      }
    });
  });

  describe('getSection', () => {
    it('returns null for invalid language', () => {
      const result = getSection('section_0_introduction', 'fr', 'manual-main');
      expect(result).toBeNull();
    });

    it('returns null for valid inputs but non-existent slug', () => {
      const result = getSection('non-existent-slug-123', 'pt', 'manual-main');
      expect(result).toBeNull();
    });

    it('returns section data for a valid slug', () => {
      const result = getSection('section_0_introduction', 'pt', 'manual-main');
      expect(result).not.toBeNull();
      expect(result.slug).toBe('section_0_introduction');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
    });
  });
});
