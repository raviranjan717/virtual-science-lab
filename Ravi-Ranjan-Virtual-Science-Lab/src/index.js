import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import DataProvider from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const addGoogleTranslateScript = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);

  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        includedLanguages: "en",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };
};

addGoogleTranslateScript();

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <RecoilRoot>
        <div id="google_translate_element" style={{ display: "none" }} />
        <App />
      </RecoilRoot>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
