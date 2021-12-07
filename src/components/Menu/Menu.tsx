import React, { FC, useContext } from "react"
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonList,
  IonMenu,
  IonText,
  IonMenuToggle,
} from "@ionic/react"
import { cog, moon, sunny, logoGithub } from "ionicons/icons"
import { useLocation } from "react-router-dom"
import { MenuItem } from ".."
import { AuthContext } from "../../context/auth"
import { ThemeContext } from "../../context/theme"
import { useDimensions } from "../../hooks/useDimensions"

interface Props {}

const Menu: FC<Props> = ({}) => {
  const { pathname } = useLocation()

  const { currentUser } = useContext(AuthContext)
  const { isThemeDark, toggleTheme } = useContext(ThemeContext)
  const { height } = useDimensions()

  const openGithub = () =>
    window.open("https://github.com/Adoobdoob71/EcoCycle_Web", "_blank")

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent style={{ flex: 1 }}>
        <div
          className="row"
          style={{ alignItems: "center", paddingInline: 16, paddingBlock: 24 }}>
          <IonAvatar style={{ width: 46, height: 46 }}>
            <IonImg src={currentUser?.photoURL ? currentUser?.photoURL : ""} />
          </IonAvatar>
          <div className="column" style={{ flex: 1, marginInlineStart: 8 }}>
            <IonText color="dark">
              <span style={{ fontSize: 18, fontWeight: "bold" }}>
                {currentUser?.displayName}
              </span>
            </IonText>
            <IonText color="medium">
              <span style={{ fontSize: 12 }}>{currentUser?.email}</span>
            </IonText>
          </div>
        </div>
        <IonList style={{ backgroundColor: "transparent" }}>
          <MenuItem
            title="Home"
            active={pathname === "/home"}
            navigateTo="/home"
            icon={undefined}
            style={{ marginInline: 16, marginBottom: 16 }}
          />
          <MenuItem
            title="Search"
            active={pathname === "/search"}
            navigateTo="/search"
            icon={undefined}
            style={{ marginInline: 16, marginBottom: 16 }}
          />
          <MenuItem
            title="Friends"
            active={pathname === "/friends"}
            navigateTo="/friends"
            icon={undefined}
            style={{ marginInline: 16, marginBottom: 16 }}
          />
          <MenuItem
            title="Nearby Stations"
            active={pathname === "/nearby"}
            navigateTo="/nearby"
            icon={undefined}
            style={{ marginInline: 16, marginBottom: 16 }}
          />
          <MenuItem
            title="My Profile"
            active={pathname === `/profile/${currentUser?.uid}`}
            navigateTo={`/profile/${currentUser?.uid}`}
            icon={undefined}
            style={{ marginInline: 16, marginBottom: 16 }}
          />
        </IonList>
        <div
          className="row"
          style={{
            marginTop: height - 435,
            justifyContent: "flex-end",
            alignItems: "center",
            alignSelf: "stretch",
            paddingInline: 12,
          }}>
          <IonButton onClick={toggleTheme} buttonType="icon">
            <IonIcon
              slot="icon-only"
              icon={isThemeDark ? sunny : moon}
              size="small"
            />
          </IonButton>
          <IonButton onClick={openGithub} buttonType="icon">
            <IonIcon slot="icon-only" icon={logoGithub} size="small" />
          </IonButton>
          <IonMenuToggle>
            <IonButton
              buttonType="icon"
              routerLink="/settings"
              routerDirection="forward">
              <IonIcon slot="icon-only" icon={cog} size="small" />
            </IonButton>
          </IonMenuToggle>
        </div>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
