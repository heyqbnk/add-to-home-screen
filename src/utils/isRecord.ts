/**
 * @returns True if the value is a plain object.
 * @param value - value to check.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && !Array.isArray(value) && typeof value === 'object';
}