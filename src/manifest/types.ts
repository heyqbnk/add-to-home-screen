export interface ManifestIcon {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: string;
}

/**
 * Minimal set of the Web Manifest properties we are using in the project.
 * @see [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
 */
export interface Manifest {
  display: string;
  icons: ManifestIcon[];
  name: string;
  start_url: string;
}