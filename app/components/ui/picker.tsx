import { ThemeType } from "@app/constants/themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import useTheme from "../hooks/useTheme";
import Icon from "react-native-vector-icons/AntDesign"
import { capitaliseWord } from "@app/utils/capitaliseWord";

interface PropsInterface {
    label: string;
    state: any;
    setState: any; 
    items: any;
    backgroundColor?: string;
    textColor: string
}

const ListokPicker: React.FC<PropsInterface> = ({
    label,
    state,
    setState,
    items,
    backgroundColor,
    textColor
}) => {

    const theme = useTheme(styles)

    return (
        <View style={theme.container}>
            <Text style={{backgroundColor: backgroundColor, ...theme.label}}>{label}</Text>
            <RNPickerSelect
                items={items}
                value={state}
                itemKey={state}
                onValueChange={(value: any) => setState(value)}
                style={{viewContainer: {width: '100%'}}}
            >
                <View style={theme.pickerInternal}>
                    <Icon name="caretdown" size={12} color={textColor}/>
                    <Text style={{...theme.pickerText, color: textColor}}>{capitaliseWord(state)}</Text>
                </View>
            </RNPickerSelect>
        </View>
    )
}

const styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        marginVertical: 10
    },
    pickerInternal: {
        flexDirection: 'row',
        height: '100%',
        flexGrow: 1,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    pickerText: {
        marginLeft: 5
    },
    label: {
        position: 'absolute',
        top: -9,
        left: 10,
        fontSize: 13,
        color: 'grey',
        paddingHorizontal: 5
    }
})

export default ListokPicker