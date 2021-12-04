import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { IonApp, IonRouterOutlet, IonSplitPane, IonSpinner } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router-dom"
import { AuthContext } from "./context/auth"
import { ThemeContext } from "./context/theme"

import { useTheme } from "./hooks/useTheme"
import { useAuth } from "./hooks/useAuth"
import { Menu } from "./components"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Theme variables */
import "./theme/variables.css"
import "./utils/styles.css"

const Home = lazy(() => import("./pages/Home/Home"))
const Profile = lazy(() => import("./pages/Profile/Profile"))
const Friends = lazy(() => import("./pages/Friends/Friends"))
const Scan = lazy(() => import("./pages/Scan/Scan"))
const Settings = lazy(() => import("./pages/Settings/Settings"))
const SignIn = lazy(() => import("./pages/SignIn/SignIn"))
const Record = lazy(() => import("./pages/Record/Record"))
const History = lazy(() => import("./pages/History/History"))
const Search = lazy(() => import("./pages/Search/Search"))
const Results = lazy(() => import("./pages/Search/Results/Results"))
const NearbyStations = lazy(
  () => import("./pages/NearbyStations/NearbyStations")
)

// import Home from "./pages/Home/Home"
// import Profile from "./pages/Profile/Profile"
// import Friends from "./pages/Friends/Friends"
// import Scan from "./pages/Scan/Scan"
// import Settings from "./pages/Settings/Settings"
// import SignIn from "./pages/SignIn/SignIn"
// import Record from "./pages/Record/Record"
// import History from "./pages/History/History"
// import Search from "./pages/Search/Search"
// import Results from "./pages/Search/Results/Results"
// import NearbyStations from "./pages/NearbyStations/NearbyStations"

const App: React.FC = () => {
  const { auth, authObj, currentUser, updateUser, records, loading } = useAuth()
  const { themeObj, isThemeDark, toggleTheme } = useTheme()

  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null)

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor:
              localStorage.getItem("color-theme") === "dark"
                ? "#121212"
                : "#FFFFFF",
          }}>
          <IonSpinner style={{ color: "#44ffc1" }} />
        </div>
      }>
      <AuthContext.Provider value={authObj}>
        <ThemeContext.Provider value={themeObj}>
          <IonApp>
            <IonReactRouter>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    height: "100vh",
                    width: "100vw",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      localStorage.getItem("color-theme") === "dark"
                        ? "#121212"
                        : "#FFFFFF",
                  }}>
                  <IonSpinner style={{ color: "#44ffc1" }} />
                </div>
              ) : currentUser ? (
                <IonSplitPane contentId="main">
                  <Menu />
                  <IonRouterOutlet id="main">
                    {/* {routes.map((item, index) => (
                    <Route path={item.endpoint} exact={item?.exact} key={index}>
                      {item.redirect ? (
                        <Redirect to={item.redirect} />
                      ) : (
                        item.component
                      )}
                    </Route>
                  ))} */}
                    <Route path="/" exact={true}>
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/home" exact={true}>
                      <Home />
                    </Route>
                    <Route path="/signin" exact={true}>
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/friends" exact={true}>
                      <Friends />
                    </Route>
                    <Route path="/search" exact={true}>
                      <Search />
                    </Route>
                    <Route path="/search/:query">
                      <Results />
                    </Route>
                    <Route path="/profile/:uid">
                      <Profile />
                    </Route>
                    <Route path="/scan" exact={true}>
                      <Scan />
                    </Route>
                    <Route path="/record" exact={true}>
                      <Record />
                    </Route>
                    <Route path="/history" exact={true}>
                      <History />
                    </Route>
                    <Route path="/nearby" exact={true}>
                      <NearbyStations router={routerRef.current} />
                    </Route>
                    <Route path="/settings" exact={true}>
                      <Settings />
                    </Route>
                    <Route>
                      <Redirect to="/home" />
                    </Route>
                  </IonRouterOutlet>
                </IonSplitPane>
              ) : (
                <IonRouterOutlet id="main">
                  <Route path="/" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/signin" exact={true}>
                    <SignIn />
                  </Route>
                  <Route path="/home" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/friends" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/search" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/search/:query">
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/profile/:uid">
                    <Profile />
                  </Route>
                  <Route path="/scan" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/record" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/history" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route path="/nearby" exact={true}>
                    <Redirect to="signin" />
                  </Route>
                  <Route path="/settings" exact={true}>
                    <Redirect to="/signin" />
                  </Route>
                  <Route>
                    <Redirect to="/home" />
                  </Route>
                </IonRouterOutlet>
              )}
            </IonReactRouter>
          </IonApp>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Suspense>
  )
}

export default App
