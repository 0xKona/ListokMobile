import useTheme from '@app/components/hooks/useTheme';
import { useAlert } from '@app/components/ui/alert';
import ListokButton from '@app/components/ui/button';
import ListokInput from '@app/components/ui/input';
import ListokPicker from '@app/components/ui/picker';
import { ingredientCategoryOptions, ingredientMeasurementOptions } from '@app/constants/ingredients';
import { ThemeType } from '@app/constants/themes';
import { CategoryType, IngredientType, MeasurementType } from '@typed/recipe-types';
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableHighlight} from 'react-native';

interface PropsInterface {
  visible: boolean;
  onSubmit: (newItem: IngredientType) => void,
  onClose: () => void;
}

const NewAdditionalItemModal = ({ visible, onSubmit, onClose }: PropsInterface) => {

    const theme = useTheme(styles);

    const defaultState = {
        name: '',
        amount: 0,
        measurement: 'units',
        category: 'other'
    }

    const [newItem, setNewItem] = React.useState<IngredientType>(defaultState as IngredientType);

    const setNewName = (newValue: string) => {
        setNewItem((prevState) => ({
            ...prevState,
            name: newValue
        }))
    }

    const setNewAmount = (newValue: number) => {
        setNewItem((prevState) => ({
            ...prevState,
            amount: newValue
        }))
    }

    const setNewMeasurement = (newValue: MeasurementType) => {
        setNewItem((prevState) => ({
            ...prevState,
            measurement: newValue
        }))
    }

    const setNewCategory = (newValue: CategoryType) => {
        setNewItem((prevState) => ({
            ...prevState,
            category: newValue
        }))
    }

    const onCloseCheck = () => {
        const initialState = JSON.stringify(defaultState);
        const itemState = JSON.stringify(newItem);
        if (itemState !== initialState) {
            useAlert(
                'Discard new item?',
                'Are you sure you want to discard your item without saving?',
                [
                    { text: 'Discard', style: 'destructive', onPress: onClose}
                ]
            )

        } else {
            onClose();
        }
    }


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableHighlight style={theme.modalBackground} onPress={onCloseCheck}>
        <View style={theme.container}>
            <Text style={theme.title} >Add new Item</Text>
            <View style={theme.formSection}>
                <ListokInput
                    inputName='Name'
                    value={newItem.name}
                    onChangeText={setNewName}
                    backgroundColor={theme.container.backgroundColor}
                    textColor={theme.title.color}
                />
            </View>
            <View style={theme.formSection}>
                <ListokInput
                    inputName='Amount'
                    value={newItem.amount}
                    onChangeText={setNewAmount}
                    type="number"
                    backgroundColor={theme.container.backgroundColor}
                    textColor={theme.title.color}
                />
            </View>
            <ListokPicker 
                label='Amount Measurement'
                backgroundColor={theme.container.backgroundColor}
                state={newItem.measurement}
                setState={setNewMeasurement}
                items={ingredientMeasurementOptions}
                textColor={theme.title.color}
            />
            <ListokPicker 
                label='Item Category'
                backgroundColor={theme.container.backgroundColor}
                state={newItem.category}
                setState={setNewCategory}
                items={ingredientCategoryOptions}
                textColor={theme.title.color}
            />
            <View style={theme.submitButton}>
                <ListokButton text="Submit" onPress={() => onSubmit(newItem)} propStyles={{borderRadius: 5}}/>
            </View>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    color: theme.surfaceText
  },
  formSection: {
    marginBottom: 10,
    width: '100%'
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%'
  }
});

export default NewAdditionalItemModal;