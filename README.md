# Add to Home Screen

This project assists developers in implementing an "Add to Home Screen" page without needing to
build it from scratch.

> [!NOTE]
> The work is still in progress.

## Usage

To use this page, specify the following query parameters when opening it:

- **`redirect_to`**: The URL to which the user will be redirected when they open the Home Screen
  link.
- **`manifest`**: A JSON object, converted to a string, containing the required properties:
  - **`icons`**: Icons for the web app, as specified in
    the [Web App Manifest icons](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons).
  - **`name`**: The name of the web app, as specified in
    the [Web App Manifest name](https://developer.mozilla.org/en-US/docs/Web/Manifest/name).

These properties will be used to create the Home Screen link.

The page reads the query parameters, generates a
valid [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest), and performs
additional actions to ensure proper functionality on desktop devices.

Once opened, the page displays app information and prompts the user to add the app to their Home
Screen.

The created Home Screen link includes a `redirect_url` query parameter, set to the
specified `redirect_to` URL. Upon being opened, the page automatically redirects the user to this
URL.