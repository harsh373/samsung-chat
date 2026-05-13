
import React from "react";
import ReactDOM from "react-dom/client";  
import App from "./App.jsx";             
import "./index.css";                    

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* StrictMode renders components twice in dev to catch side effects — has zero effect in production */}
    <App />
  </React.StrictMode>
);