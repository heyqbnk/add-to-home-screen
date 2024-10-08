import { isRecord } from '@/utils/isRecord.js';
import type { Manifest, ManifestIcon } from '@/manifest/types.js';

/**
 * @returns Manifest required parameters.
 * @param value - value to extract the parameters from.
 */
export function getManifestRequiredParams(value: string): Pick<Manifest, 'name' | 'icons'> {
  let manifestJson: unknown;
  try {
    manifestJson = JSON.parse(value);
  } catch (e) {
    throw new Error('manifest is not JSON');
  }

  if (!isRecord(manifestJson)) {
    throw new Error('manifest is not a plain object');
  }

  const { name, icons } = manifestJson;
  if (typeof name !== 'string' || !name) {
    throw new Error('manifest.name is invalid');
  }
  if (!Array.isArray(icons) || !icons.length) {
    throw new Error('manifest.icons is invalid');
  }

  return {
    name: name,
    icons: icons.map((manifestIcon, idx) => {
      if (!isRecord(manifestIcon)) {
        throw new Error(`manifest.icons[${idx}] is not a plain object`);
      }
      const { src, sizes, type, purpose } = manifestIcon;
      if (typeof src !== 'string' || !src) {
        throw new Error(`manifest.icons[${idx}].src is invalid`);
      }

      const icon: ManifestIcon = { src };

      if (sizes) {
        if (typeof sizes !== 'string' || !sizes.match(/^(\d+x\d+( \d+x\d+)*|any)$/)) {
          throw new Error(`manifest.icons[${idx}].sizes is invalid`);
        }
        icon.sizes = sizes;
      }

      if (type) {
        if (typeof type !== 'string') {
          throw new Error(`manifest.icons[${idx}].type is invalid`);
        }
        icon.type = type;
      }

      if (purpose) {
        if (
          typeof purpose !== 'string'
          || purpose.split(' ').some(v => !['maskable', 'monochrome', 'any'].includes(v))
        ) {
          throw new Error(`manifest.icons[${idx}].purpose is invalid`);
        }
        icon.purpose = purpose;
      }
      return icon;
    }),
  };
}