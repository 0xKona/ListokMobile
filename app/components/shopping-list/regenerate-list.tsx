import { ThemeType } from "@app/constants/themes";
import { generateShoppingList } from "@redux/slices/shoppingManagerSlice";
import { AppDispatch, RootState } from "@redux/store";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../hooks/useTheme";
import { actionSheet } from "../ui/action-sheet";

const RegenButton = () => {

    const theme = useTheme(styles);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedListok } = useSelector(
        (state: RootState) => state.shoppingManager,
      );
    const { token } = useSelector((state: RootState) => state.user.user);

    const refreshAction = [{
        actionName: 'Regenerate Shopping List', 
        actionFunction: () => dispatch(generateShoppingList(selectedListok as string))
    }]

    const regenerate = () => {
        actionSheet(refreshAction, 1, () => {}, 'Regenerate List?', 'This will clear any changes or selections and cannot be reverted' )
    };

    return (
        <TouchableOpacity onPress={regenerate} style={theme.container}>
            <Icon name="refresh" size={25} color={theme.container.color}/>
        </TouchableOpacity>
    )
}

const styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 80,
        color: theme.themeGradientText
    }
})

export default RegenButton;