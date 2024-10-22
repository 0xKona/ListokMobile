import useTheme from "@app/components/hooks/useTheme";
import { actionSheet } from "@app/components/ui/action-sheet";
import { ThemeType } from "@app/constants/themes";
import { IngredientType } from "@typed/recipe-types";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { fetchAdditionalItemsList, updateAdditionalItemsList } from "@redux/slices/shoppingManagerSlice";
import { AppDispatch } from "@redux/store";

interface PropsType {
    additionalItems: IngredientType[];
}

const AdditionalItemList = ({additionalItems}: PropsType) => {

    const theme = useTheme(styles);
    const dispatch = useDispatch<AppDispatch>();
    const swipeableRef = React.useRef<any>(null);
    const closeSwipeable = () => {
        if (swipeableRef.current) {
        swipeableRef.current.close();
        }
    }

    useEffect(() => {
        dispatch(fetchAdditionalItemsList(null));
    }, [])

    const handleDelete = (indexToDelete: number) => {
        const newAdditionalItems = [...additionalItems];
        newAdditionalItems.splice(indexToDelete, 1);
        dispatch(updateAdditionalItemsList(newAdditionalItems));
      };

    const handlePressDelete = (index: number) => {
        const actions = [{actionName: 'Delete Ingredient', actionFunction: () => {handleDelete(index); closeSwipeable()}}]
        actionSheet(actions, 1, closeSwipeable)
      }

    const renderDelete = (index: number) =>
        <TouchableOpacity onPress={() => handlePressDelete(index)} style={theme.delete}>
            <Icon name="delete" size={20} color={'white'}/>
        </TouchableOpacity>

    return (
        <ScrollView style={theme.container}>
            {additionalItems.map((item: IngredientType, index: number) => (
                <Swipeable key={item.id} ref={swipeableRef} renderRightActions={() => renderDelete(index)} overshootRight={false}>
                    <View style={[theme.listItem, theme.shadowProp]} key={item.name}>
                        <Text style={theme.text}>{item.name}</Text>
                        <Text style={theme.text}>{`${item.amount} ${item.measurement}`}</Text>
                    </View>
                </Swipeable>
        ))}
        </ScrollView>
    )
}

const styles = (theme: ThemeType) =>
    StyleSheet.create({
      container: {
        width: '100%',
        flexGrow: 1,
      },
      delete: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 5
      },
      listItem: {
        backgroundColor: theme.surface,
        shadowRadius: 1,
        width: '100%',
        height: 50,
        padding: 10,
        marginBottom: 5,
        borderColor: theme.highlight,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      text: {
        color: theme.surfaceText
      }
    });

export default AdditionalItemList;