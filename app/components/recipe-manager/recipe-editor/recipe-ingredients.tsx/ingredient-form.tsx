import React from 'react';
import ListokInput from '@app/components/ui/input';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { CategoryType, MeasurementType } from '@typed/recipe-types';
import {
  ingredientCategoryOptions,
  ingredientMeasurementOptions,
} from '@app/constants/ingredients';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import ListokPicker from '@app/components/ui/picker';

const IngredientForm = ({ addNewIngredient, closeForm }: any) => {
  const [ingredientName, setIngredientName] = React.useState('');
  const [ingredientAmount, setIngredientAmount] = React.useState<number>(0);
  const [ingredientMeasurement, setIngredientMeasurement] =
    React.useState<MeasurementType>('units');
  const [ingredientCategory, setIngredientCategory] =
    React.useState<CategoryType>('fruit');

  const theme = useTheme(styles);

  const handleSubmit = () => {
    addNewIngredient({
      name: ingredientName,
      amount: ingredientAmount,
      measurement: ingredientMeasurement,
      category: ingredientCategory,
    });
  };

  const handleClose = () => {
    closeForm();
    setIngredientName('');
    setIngredientAmount(0);
    setIngredientMeasurement('units');
    setIngredientCategory('fruit');
  };

  return (
    <>
      <View style={theme.closeButtonContainer}>
        <Text style={theme.title}>Add New Ingredient</Text>
        <TouchableOpacity onPress={handleClose}>
          <Icon name="closecircle" size={20} />
        </TouchableOpacity>
      </View>

      <View style={theme.container}>
        <View style={theme.formSection}>
          {/* <Text>Ingredient Name:</Text> */}
          <ListokInput
            inputName='Ingredient Name'
            value={ingredientName}
            onChangeText={setIngredientName}
            backgroundColor={theme.container.backgroundColor}
          />
        </View>

        <View style={theme.formSection}>
          {/* <Text>Ingredient Amount:</Text> */}
          <ListokInput
            inputName='Amount'
            value={ingredientAmount}
            onChangeText={setIngredientAmount}
            type="number"
            backgroundColor={theme.container.backgroundColor}
          />
        </View>

        <ListokPicker 
          label='Amount Measurement'
          backgroundColor={theme.container.backgroundColor}
          state={ingredientMeasurement}
          setState={setIngredientMeasurement}
          items={ingredientMeasurementOptions}
        />

        <ListokPicker 
          label='Category' 
          backgroundColor={theme.container.backgroundColor} 
          state={ingredientCategory} setState={setIngredientCategory} 
          items={ingredientCategoryOptions}
        />

        <View style={theme.submitButton}>
          <ListokButton text="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      display: 'flex',
      width: '100%',
      flexGrow: 1
    },
    closeButtonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    title: {
      fontSize: 20,
    },
    formSection: {
      marginBottom: 10,
    },
    dropdown: {
      width: '100%',
      borderBlockColor: 'black',
      borderWidth: 1,
      padding: 10,
      flexDirection: 'row',
    },
    submitButton: {
      marginTop: "auto",
      marginBottom: 10
    }
  });

export default IngredientForm;
