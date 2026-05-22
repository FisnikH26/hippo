import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { HippoReadsContextProvider } from "./assets/context/HippoReadsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HippoReadsContextProvider>
      <App />
    </HippoReadsContextProvider>
  </React.StrictMode>
);



