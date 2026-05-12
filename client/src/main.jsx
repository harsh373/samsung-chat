// FILE: client/src/main.jsx
// ONE JOB: Mount the React app into the HTML page. That's it. Nothing else lives here.

import React from "react";
import ReactDOM from "react-dom/client";  // "client" = browser rendering (vs "server" for SSR)
import App from "./App.jsx";             // the root component that owns all state
import "./index.css";                    // import Tailwind — must be here so it's bundled globally

// createRoot() is the React 18 API — it replaces the old ReactDOM.render()
// document.getElementById("root") finds the <div id="root"> in index.html
// .render(<App />) turns the JSX into DOM nodes and inserts them into that div
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode renders components twice in dev to catch side effects — has zero effect in production */}
    <App />
  </React.StrictMode>
);