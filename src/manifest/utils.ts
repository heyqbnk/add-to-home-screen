import { getManifestRequiredParams } from '@/manifest/getManifestRequiredParams.js';
import type { Manifest, ManifestIcon } from '@/manifest/types.js';
import { getAnySizeIcon } from '@/manifest/getAnySizeIcon.js';
import { getSvgIcon } from '@/manifest/getSvgIcon.js';

interface CachedValue {
  manifest: Manifest;
  redirectTo: string;
}

// Query parameter responsible for redirecting the user.
const REDIRECT_URL_QUERY_PARAM = 'redirect_url';

// Session storage key responsible for saving the a2hs parameters.
const SESSION_STORAGE_CACHE_KEY = '___cached___';

export function processManifest(): Manifest | undefined {
  const query = new URLSearchParams(window.location.search);

  const cachedValueRaw = sessionStorage.getItem(SESSION_STORAGE_CACHE_KEY);
  const cachedValue = cachedValueRaw
    ? JSON.parse(cachedValueRaw) as CachedValue
    : undefined;

  // If there is no cached value, we should check if the user has to be redirected.
  if (!cachedValue) {
    const redirectUrl = query.get(REDIRECT_URL_QUERY_PARAM);
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }
  }

  const { icons, name } = getManifestRequiredParams(
    cachedValue
      ? JSON.stringify(cachedValue.manifest)
      : query.get('manifest') || '',
  );
  const redirectTo = cachedValue ? cachedValue.redirectTo : query.get('redirect_to') || '';
  if (!redirectTo) {
    throw new Error('redirect_to is invalid');
  }

  // Construct a URL which will be used to redirect the user to the target URL.
  const startUrlParams = new URLSearchParams([
    [REDIRECT_URL_QUERY_PARAM, redirectTo],
    // Random value. We need this to prevent the browser from caching the icon image in case
    // this page (a2hs) was opened several times, but redirectTo remained the same. New manifest
    // icons will just not be applied because the browser will cache the icon for the redirectTo.
    ['r', Math.random().toString(36)],
  ]);
  const startUrl = new URL('?' + startUrlParams.toString(), window.location.href);

  // Site Web Manifest.
  const manifest: Manifest = {
    name,
    icons,
    display: 'standalone',
    start_url: startUrl.toString(),
  };

  // Create a manifest link and place it in the <head/>, so the browser could recognize it. We
  // need this action mostly for mobile devices.
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = `data:application/manifest+json;base64,${btoa(JSON.stringify(manifest))}`;
  document.head.appendChild(link);

  // In desktop applications, we need to replace the current URL with the target one, because we
  // are using the "Create shortcut" way, that just creates a shortcut to the current page URL.
  // We also replace the page title and favicon, as long as they will be used by the browser
  // during the shortcut creation process.

  // Find the most suitable icon.
  const icon = getAnySizeIcon(icons) || getSvgIcon(icons) || icons[0];

  window.history.replaceState(null, '', startUrl);
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = icon.src;
  icon.type && (favicon.type = icon.type);
  document.title = name;
  document.head.appendChild(favicon);

  // Save the a2hs parameters, so when refreshing the current page, we would not be redirected
  // automatically.
  sessionStorage.setItem(SESSION_STORAGE_CACHE_KEY, JSON.stringify({
    manifest,
    redirectTo,
  } satisfies CachedValue));

  return manifest;
}