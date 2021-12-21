import { lazy, Suspense } from "react"
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
const Settings = lazy(() => import("./pages/Settings/Settings"))
const SignIn = lazy(() => import("./pages/SignIn/SignIn"))
const Record = lazy(() => import("./pages/Record/Record"))
const History = lazy(() => import("./pages/History/History"))
const Search = lazy(() => import("./pages/Search/Search"))
const Results = lazy(() => import("./pages/Search/Results/Results"))
const NearbyStations = lazy(
  () => import("./pages/NearbyStations/NearbyStations")
)

const App: React.FC = () => {
  const { authObj, currentUser, loading } = useAuth()
  const { themeObj } = useTheme()

  return (
    <Suspense fallback={FallbackTwo()}>
      <AuthContext.Provider value={authObj}>
        <ThemeContext.Provider value={themeObj}>
          <IonApp>
            <IonReactRouter>
              {loading ? (
                <FallbackTwo />
              ) : currentUser ? (
                <IonSplitPane contentId="main">
                  <Menu />
                  <IonRouterOutlet id="main">
                    <Route path="/" exact={true}>
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/home" exact={true}>
                      <Suspense fallback={FallbackTwo()}>
                        <Home />
                      </Suspense>
                    </Route>
                    <Route path="/signin" exact={true}>
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/friends" exact={true}>
                      <Suspense fallback={Fallback()}>
                        <Friends />
                      </Suspense>
                    </Route>
                    <Route path="/search" exact={true}>
                      <Suspense fallback={Fallback()}>
                        <Search />
                      </Suspense>
                    </Route>
                    <Route path="/search/:query">
                      <Suspense fallback={Fallback()}>
                        <Results />
                      </Suspense>
                    </Route>
                    <Route path="/profile/:uid">
                      <Suspense fallback={Fallback()}>
                        <Profile />
                      </Suspense>
                    </Route>
                    <Route path="/record" exact={true}>
                      <Suspense fallback={Fallback()}>
                        <Record />
                      </Suspense>
                    </Route>
                    <Route path="/history" exact={true}>
                      <Suspense fallback={Fallback()}>
                        <History />
                      </Suspense>
                    </Route>
                    <Route path="/nearby" exact={true}>
                      <Suspense fallback={Fallback()}>
                        <NearbyStations />
                      </Suspense>
                    </Route>
                    <Route path="/settings" exact={true}>
                      <Suspense fallback={Fallback()}>
                        <Settings />
                      </Suspense>
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
                    <Suspense fallback={FallbackTwo()}>
                      <SignIn />
                    </Suspense>
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
                    <Suspense fallback={Fallback()}>
                      <Profile />
                    </Suspense>
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
                    <Redirect to="/signin" />
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

const Fallback = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
      backgroundColor:
        localStorage.getItem("color-theme") === "dark" ? "#121212" : "#FFFFFF",
    }}>
    <div
      style={{
        width: "100vw",
        backgroundColor: "var(--ion-toolbar-background)",
        height: 56,
      }}></div>
  </div>
)

const FallbackTwo = () => (
  <div
    style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        localStorage.getItem("color-theme") === "dark" ? "#121212" : "#FFFFFF",
    }}>
    <span
      style={{
        color: "var(--ion-color-dark)",
        fontSize: 24,
        marginBottom: 12,
      }}>
      Loading
    </span>
    <IonSpinner style={{ color: "#44ffc1" }} />
  </div>
)

export default App
