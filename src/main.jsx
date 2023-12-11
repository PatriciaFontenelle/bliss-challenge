import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { FeedbackProvider } from "./contexts/FeedbackContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode was commented to prevent it from double rendering the app on development mode.
  // <React.StrictMode>
  <FeedbackProvider>
    <RouterProvider router={router} />
  </FeedbackProvider>
  // </React.StrictMode>,
);
