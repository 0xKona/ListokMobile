import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContextMenu from 'react-native-context-menu-view'
import { ThemeType } from "@app/constants/themes";
import useTheme from "../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { ShoppingNavigationProp } from "@typed/navigation";

const AdditionalOptions = () => {

  const theme = useTheme(styles);
  const navigation = useNavigation<ShoppingNavigationProp>();

    return (
        <ContextMenu
        dropdownMenuMode
        actions={[{ title: "Edit Additional Items" }]}
        onPress={(e) => {
          navigation.navigate("Additional Items");
        }}
        style={theme.container}
      >
        <Icon name="more-vert" color={'white'} size={30}/>
      </ContextMenu>
    )
}

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    paddingLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 80,
    color: theme.themeGradientText,
  }
})

export default AdditionalOptions;