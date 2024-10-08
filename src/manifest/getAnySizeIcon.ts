import type { ManifestIcon } from '@/manifest/types.js';

/**
 * @returns A manifest icon with "sizes" = "any"
 * @param icons - icons array.
 */
export function getAnySizeIcon(icons: ManifestIcon[]): ManifestIcon | undefined {
  return icons.find(icon => icon.sizes === 'any');
}