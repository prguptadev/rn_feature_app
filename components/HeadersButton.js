import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constant/Colors";

const HeadersButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={25}
      color={Platform.OS === "android" ? Colors.primary : "white"}
      {...props}
    ></HeaderButton>
  );
};

export default HeadersButton;
