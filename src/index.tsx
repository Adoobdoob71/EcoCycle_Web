import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import { IonSpinner, setupConfig } from "@ionic/react"
const App = lazy(() => import("./App"))

setupConfig({ mode: "md" })

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            height: window.innerHeight,
            width: window.innerWidth,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              localStorage.getItem("color-theme") === "dark"
                ? "#121212"
                : "#FFFFFF",
          }}>
          <IonSpinner style={{ color: "#44ffc1" }} />
        </div>
      }>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
