import { useRef, Suspense } from "react"
import { IonApp, IonRouterOutlet, IonSplitPane, IonSpinner } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router-dom"
import { Helmet } from "react-helmet"

import { AuthContext } from "./context/auth"
import { ThemeContext } from "./context/theme"

import { useTheme } from "./hooks/useTheme"
import { useAuth } from "./hooks/useAuth"

import { Menu } from "./components"

import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import Friends from "./pages/Friends/Friends"
import Settings from "./pages/Settings/Settings"
import SignIn from "./pages/SignIn/SignIn"
import Record from "./pages/Record/Record"
import History from "./pages/History/History"
import Search from "./pages/Search/Search"
import Results from "./pages/Search/Results/Results"
import NearbyStations from "./pages/NearbyStations/NearbyStations"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Theme variables */
import "./theme/variables.css"
import "./utils/styles.css"

const App: React.FC = () => {
  const { authObj, currentUser, loading } = useAuth()
  const { themeObj } = useTheme()

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
          <Helmet>
            <title>EcoCycle</title>
            <meta name="description" content="The Recycling App." />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ecocycle.web.app" />
            <meta property="og:title" content="EcoCycle" />
            <meta property="og:description" content="The Recycling App." />
            <meta
              property="og:image"
              content="https://ecocycle.web.app/assets/icon/icon.png"
            />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://ecocycle.web.app" />
            <meta name="twitter:title" content="EcoCycle" />
            <meta name="twitter:description" content="The Recycling App." />
            <meta
              name="twitter:image"
              content="https://ecocycle.web.app/assets/icon/icon.png"
            />
          </Helmet>
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
