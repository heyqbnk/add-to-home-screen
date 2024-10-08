import { createMemo } from 'solid-js';

import { publicURL } from '@/utils/publicURL.js';
import { getSvgIcon } from '@/manifest/getSvgIcon.js';
import { createSrcSet } from '@/utils/createSrcSet.js';
import type { Manifest } from '@/manifest/types.js';

import './App.scss';

export function App(props: { manifest: Manifest }) {
  const icon = createMemo(() => {
    const { icons } = props.manifest;
    return getSvgIcon(icons) || icons[0];
  });

  return (
    <div class="app">
      <img
        class="app__icon"
        src={icon().src}
        width={72}
        height={72}
        alt={`${props.manifest.name} icon`}
      />
      <h1 class="app__title">{props.manifest.name}</h1>
      <h2 class="app__subtitle">Get it done in just a few taps and seconds</h2>
      <ol class="app__list">
        <li class="app__list-item">
          <span>
            &nbsp;Tap at the share icon
            <svg class="app__share-icon" width="17" height="21" viewBox="0 0 17 21">
              <use href={publicURL('img/ios/sprite.svg#share-icon')}/>
            </svg>
            in your browser.
          </span>
          <div class="app__img-container" style="padding-top: 28.49%">
            <img
              class="app__img"
              src={publicURL('img/ios/step-1/tabbar.png')}
              srcSet={createSrcSet(publicURL('img/ios/step-1/tabbar.png'))}
              alt="tabbar"
            />
            <img
              src={publicURL('img/ios/step-1/mask.svg')}
              alt="mask"
              role="presentation"
              class="app__img-mask"
            />
          </div>
        </li>

        <li class="app__list-item">
          <span>&nbsp;Then, choose the “Add to Home Screen”.</span>
          <div class="app__img-container" style="padding-top: 50.279%">
            <img
              class="app__img"
              src={publicURL('img/ios/step-2/tabbar.png')}
              srcSet={createSrcSet(publicURL('img/ios/step-2/tabbar.png'))}
              alt="tabbar"
            />
            <img
              src={publicURL('img/ios/step-2/mask.svg')}
              alt="mask"
              role="presentation"
              class="app__img-mask"
            />
          </div>
        </li>
      </ol>
    </div>
  );
}