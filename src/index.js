import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <App />
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            background: "#fff",
            color: "black",
            border: "#CB51D0",
            borderBlockWidth: 2,
          },
        }}
        reverseOrder={false}
      />
    </Suspense>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
