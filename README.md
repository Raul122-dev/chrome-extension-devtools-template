# chrome-extension-devtools-template

A minimalist template for building **Chrome Manifest V3** extensions with a **custom DevTools panel** using **React + TypeScript** and **Vite**.

---

## Main Features

| Feature              | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- | --- |
| **React + TS**       | Ready-to-use setup with Vite and `@vitejs/plugin-react`.                                  |
| **Manifest V3**      | `service_worker` as background, minimal permissions, and DevTools panel declared.         |
| **DevTools Panel**   | Creates a tab called _React Panel_ inside Developer Tools.                                |
| **Hot‑reload**       | `npm run dev` recompiles and reloads the extension on the fly.                            |
| **Utility Hooks**    | `useEval` to run JS in the page, `useChromeMessage` for panel ↔ content script messaging. |
| **Message Pipeline** | Full flow: DevTools panel ➜ background ➜ content script.                                  |     |

---

## Quick start

### 1 — Install

```bash
npm install
```

### 2 — Development mode

```bash
npm run dev
```

1. Open **chrome://extensions**.
2. Enable _Developer mode_.
3. Click **Load unpacked** and select the repo folder.
4. Open DevTools on any page ➜ **React Panel** tab.

### 3 — Production build

```bash
npm run build
```

To publish on the Chrome Web Store, upload the ZIP found in `dist/`.

---

## Folder structure

```
chrome-extension-devtools-template/
├── public/
│   ├── devtools.html      # panel boot
│   ├── panel.html         # React host
│   └── icon*.png          # icons
├── src/
│   ├── devtools.ts        # creates the DevTools tab
│   ├── background.ts      # service worker (message proxy)
│   ├── content.ts         # content script (DOM access)
│   └── panel/
│       ├── App.tsx        # main UI
│       └── hooks/
│           ├── useEval.ts
│           └── useChromeMessage.ts
├── manifest.json
├── vite.config.ts
└── README.md
```

---

## Example hooks

### `useEval`

Evaluates expressions inside the inspected tab.

```ts
const { result, run } = useEval<string>("document.title");
```

### `useChromeMessage`

Abstracts sending messages to the content script.

```ts
const send = useChromeMessage();
const { total } = await send<{ total: number }>("COUNT_IMAGES");
```

---

## Available scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Dev server with hot reload        |
| `npm run build` | Optimized build                   |
| `npm run watch` | Build in _watch_ mode (no server) |

---

## Contributions

1. Fork + descriptive branch.
2. `npm install && npm run lint` before PR.
3. Briefly explain your change.

---

## 📄 License

MIT © 2025 — Made with ❤️ by the community.
