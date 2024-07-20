import React from 'react';
import ListokInput from '@app/components/ui/input';
import { Button, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { CategoryType, MeasurementType } from '@typed/recipe-types';
import {
  ingredientCategoryOptions,
  ingredientMeasurementOptions,
} from '@app/constants/ingredients';

const IngredientForm = ({ addNewIngredient }: any) => {
  const [ingredientName, setIngredientName] = React.useState('');
  const [ingredientAmount, setIngredientAmount] = React.useState<number>(0);
  const [ingredientMeasurement, setIngredientMeasurement] =
    React.useState<MeasurementType>('units');
  const [ingredientCategory, setIngredientCategory] =
    React.useState<CategoryType>('fruit');

  const handleSubmit = () => {
    addNewIngredient({
      name: ingredientName,
      amount: ingredientAmount,
      measurement: ingredientMeasurement,
      category: ingredientCategory,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Add New Ingredient</Text>
      <Text>Ingredient Name</Text>
      <ListokInput value={ingredientName} onChangeText={setIngredientName} />
      <Text>Ingredient Amount</Text>
      <ListokInput
        value={ingredientAmount}
        onChangeText={setIngredientAmount}
        type="number"
      />
      <Text>Amount Measurement</Text>
      <RNPickerSelect
        onValueChange={(value: any) => setIngredientMeasurement(value)}
        items={ingredientMeasurementOptions}
        value={ingredientMeasurement}
        itemKey={ingredientMeasurement}
      />
      <Text>Ingredient Category</Text>
      <RNPickerSelect
        onValueChange={(value: any) => setIngredientCategory(value)}
        items={ingredientCategoryOptions}
        value={ingredientCategory}
        itemKey={ingredientCategory}
      />

      <View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
});

export default IngredientForm;
