/* @refresh reload */
import { render } from 'solid-js/web';

import { App } from '@/App/App.js';
import { processManifest } from '@/manifest/utils.js';

import './index.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

// Extract the manifest. In case it was extracted successfully, we can display its information.
// Otherwise, the redirect is expected.
const manifest = processManifest();
if (manifest) {
  render(() => (<App manifest={manifest}/>), root!);
}
