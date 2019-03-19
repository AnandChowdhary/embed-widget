# 🗃 Embed widget

Add widgets to your website, powered by embedded frames.

## ⭐ Usage

Install the library as a dependency:

```bash
npm install embed-widget
```

Or, if you're using Yarn:

```bash
yarn add embed-widget
```

Then import the library:

```js
import widget from "embed-widget";
```

And initialize it with an optional selector:

```js
const embed = new widget("https://example.com", "Button text!");
```

```html
<script src="https://unpkg.com/embed-widget"></script>
```

## 💻 API

You can use the following methods with a widget:

### Open/close/togggle

```js
embed.open(); // Open the widget
embed.close(); // Close the widget
embed.toggle(); // Open if closed, close if opened
```

### Remove

```js
embed.destroy(); // Remove button and frame from DOM
```

## 🛠️ Development

Install dependencies:

```bash
yarn
```

Start local development server and Prettier watcher:

```bash
yarn start
```

Compile Typescript to ES6 before publishing to NPM:

```bash
yarn build
```
