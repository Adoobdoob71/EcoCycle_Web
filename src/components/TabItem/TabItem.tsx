import React, { CSSProperties, FC } from "react";
import { IonText, IonRippleEffect } from "@ionic/react";
import "./TabItem.css";

interface Props {
  text: string;
  icon?: JSX.Element;
  style?: CSSProperties;
  active: boolean;
  onClick?: () => void;
}

const TabItem: FC<Props> = ({ text, icon, style, active, onClick }) => {
  return (
    <div
      className={`row tab_item_view ${active && "tab_item_view_active"}`}
      style={style}
      onClick={onClick}>
      {icon}
      <IonText
        color={active ? "primary" : "medium"}
        style={{ marginInline: 8 }}>
        <span style={{ fontSize: 16, fontWeight: "bold" }}>{text}</span>
      </IonText>
    </div>
  );
};

export default TabItem;
