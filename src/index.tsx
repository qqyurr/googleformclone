import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";
import Layout from "./components/Layout";
import store from "./store";

// eslint-disable-next-line prefer-const
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <Layout>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Layout>
    </Provider>
  </StyledEngineProvider>,
  // </React.StrictMode>,
);
