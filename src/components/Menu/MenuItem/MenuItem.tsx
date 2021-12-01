import React, { FC } from "react";
import { IonText, IonRouterLink, IonMenuToggle } from "@ionic/react";
import "./MenuItem.css";

interface Props {
  active?: boolean;
  navigateTo: string;
  title?: string;
  icon: JSX.Element | undefined;
  style?: React.CSSProperties;
}

const MenuItem: FC<Props> = ({ active, navigateTo, icon, title, style }) => {
  return (
    <IonMenuToggle>
      <IonRouterLink routerLink={navigateTo} routerDirection="none">
        <div
          className={`row menu_item ${
            active && "menu_item_active"
          } touch_opacity`}
          style={style}>
          {icon}
          <IonText color="dark">
            <span style={{ fontSize: 16, fontWeight: "bold" }}>{title}</span>
          </IonText>
        </div>
      </IonRouterLink>
    </IonMenuToggle>
  );
};

export default MenuItem;
