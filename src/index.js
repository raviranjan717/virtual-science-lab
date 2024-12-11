import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import DataProvider from "./redux/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <DataProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </DataProvider>,

  document.getElementById("root")
);

reportWebVitals();
