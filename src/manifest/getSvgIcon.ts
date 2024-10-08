import { ManifestIcon } from '@/manifest/types.js';

/**
 * @returns A manifest icon with the "svg" extension.
 * @param icons - icons array.
 */
export function getSvgIcon(icons: ManifestIcon[]): ManifestIcon | undefined {
  return icons.find(icon => {
    return new URL(icon.src, window.location.href).pathname.endsWith('.svg');
  });
}