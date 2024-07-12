import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import PLayerContextProvider from "./context/PlayerContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Wrap AuthProvider around your app */}
        <PLayerContextProvider>
          <App />
        </PLayerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
