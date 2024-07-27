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
          <Text>Ingredient Name:</Text>
          <ListokInput
            value={ingredientName}
            onChangeText={setIngredientName}
          />
        </View>

        <View style={theme.formSection}>
          <Text>Ingredient Amount:</Text>
          <ListokInput
            value={ingredientAmount}
            onChangeText={setIngredientAmount}
            type="number"
          />
        </View>

        <View style={theme.formSection}>
          <Text>Amount Measurement:</Text>
          <View style={theme.dropdown}>
            <Icon name="caretdown" />
            <RNPickerSelect
              onValueChange={(value: any) => setIngredientMeasurement(value)}
              items={ingredientMeasurementOptions}
              value={ingredientMeasurement}
              itemKey={ingredientMeasurement}
            />
          </View>
        </View>

        <View style={theme.formSection}>
          <Text>Ingredient Category:</Text>
          <View style={theme.dropdown}>
            <Icon name="caretdown" />
            <RNPickerSelect
              onValueChange={(value: any) => setIngredientCategory(value)}
              items={ingredientCategoryOptions}
              value={ingredientCategory}
              itemKey={ingredientCategory}
            />
          </View>
        </View>

        <View>
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
      display: 'flex',
      width: '100%',
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
  });

export default IngredientForm;
