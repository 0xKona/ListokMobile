import React from "react";
import { Alert, AlertButton } from "react-native";

export type ButtonType = AlertButton

export const useAlert = (
    title: string,
    desc: string,
    buttons: ButtonType[]
) => {
    Alert.alert(
        title,
        desc,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          ...buttons
        ],
      );
}