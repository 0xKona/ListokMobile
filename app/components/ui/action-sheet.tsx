import { ActionSheetIOS } from "react-native";
import { store } from '@redux/store'

export interface ActionInterface {
    actionName: string;
    actionFunction: () => any;
}

export const actionSheet = (
    actions: ActionInterface[],
    destructiveIndex?: number
) => {

    const actionNames = ['Cancel', ...actions.map((action: ActionInterface) => action.actionName)];
    const actionFuncs = [() => {}, ...actions.map((action: ActionInterface) => action.actionFunction)];

    const checkDarkMode = () => store.getState().theme.currentTheme.themeName === 'dark'

    const destructiveButtonIndex = destructiveIndex ? destructiveIndex : null;

    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: actionNames,
            destructiveButtonIndex: destructiveButtonIndex,
            cancelButtonIndex: 0,
            userInterfaceStyle: checkDarkMode() ? 'dark' : 'light'
        },
        buttonIndex => {
            actionFuncs[buttonIndex]();
        }    
    )
}