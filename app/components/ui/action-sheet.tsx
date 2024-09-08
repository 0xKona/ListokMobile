import { ActionSheetIOS, Platform } from "react-native";
import { store } from '@redux/store'

export interface ActionInterface {
    actionName: string;
    actionFunction: () => any;
}

export const actionSheet = (
    actions: ActionInterface[],
    destructiveIndex?: number,
    cancelFunction?: () => any
) => {

    if (Platform.OS === 'ios') {
        const actionNames = ['Cancel', ...actions.map((action: ActionInterface) => action.actionName)];
        const actionFuncs = [cancelFunction ? cancelFunction : () => {}, ...actions.map((action: ActionInterface) => action.actionFunction)];
    
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
    } else {
        // TODO : Implement non iOS usage.
        console.error("Action sheet currently implemented for iOS only, if refactoring for android use, implement in the action-sheet file")
    }
}