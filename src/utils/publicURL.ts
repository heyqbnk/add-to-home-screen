/**
 * Returns the path, using the project configuration base URL.
 * @param path - path to prepend the base URL to.
 */
export function publicURL(path: string): string {
  const url = new URL(path, `http://a${import.meta.env.BASE_URL}`);
  return url.pathname + url.search + url.hash;
}