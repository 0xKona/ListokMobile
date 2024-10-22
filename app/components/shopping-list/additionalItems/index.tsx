import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AdditionalItemList from "./additional-item-list";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import useTheme from "@app/components/hooks/useTheme";
import ListokButton from "@app/components/ui/button";
import NewAdditionalItemModal from "./new-item-modal";
import { IngredientType } from "@typed/recipe-types";
import { updateAdditionalItemsList } from "@redux/slices/shoppingManagerSlice";

const AdditionalItems = () => {

    const [newItemModalIsVisible, setnewItemModalIsVisible] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const theme = useTheme(styles);

    const { additionalItems } = useSelector((state: RootState) => state.shoppingManager);

    const showNewItemModal = () => {
        setnewItemModalIsVisible(true);
    };

    const hideNewItemModalWithoutSaving = () => {
        setnewItemModalIsVisible(false);
    };

    const submitNewItem = (newItem: IngredientType) => {
        const newAdditionalItems = [...additionalItems, newItem];
        dispatch(updateAdditionalItemsList(newAdditionalItems));
        hideNewItemModalWithoutSaving();
    }

    return (
        <>
            {newItemModalIsVisible && (
                <NewAdditionalItemModal visible={newItemModalIsVisible} onSubmit={submitNewItem} onClose={hideNewItemModalWithoutSaving} />
            )}
            <View style={theme.container}>
                <AdditionalItemList additionalItems={additionalItems}/>
                <ListokButton propStyles={{marginTop: 'auto'}} text='Add New' onPress={showNewItemModal}/>
            </View>
        </>
    )
}

const styles = (theme: any) =>
    StyleSheet.create({
      container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.surface,
      },
      titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
      },
    });


export default AdditionalItems;