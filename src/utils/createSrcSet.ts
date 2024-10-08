/**
 * Creates the "img" tag "srcset" attribute using 1-4 scales.
 * @param imgUrl - image URL.
 */
export function createSrcSet(imgUrl: string): string {
  const url = new URL(imgUrl, window.location.href);
  const parts = url.pathname.split('.');

  // Path to the file without extension.
  const noExt = parts.slice(0, parts.length - 1);

  // Extension name.
  const ext = parts[parts.length - 1];

  return [
    imgUrl,
    ...[2, 3, 4].map(scale => `${noExt}@${scale}x.${ext} ${scale}x`),
  ].join(', ');
}