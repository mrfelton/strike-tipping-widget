import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Find all widget divs
const widgetDivs = document.querySelectorAll('.strike-widget');

widgetDivs.forEach(rootElement => {
  const { apikey, handle, amount, theme } = rootElement.dataset;
  ReactDOM.render(
    <React.StrictMode>
      <App apikey={apikey} handle={handle} amount={amount} theme={theme} />
    </React.StrictMode>,
    rootElement
  );
});
