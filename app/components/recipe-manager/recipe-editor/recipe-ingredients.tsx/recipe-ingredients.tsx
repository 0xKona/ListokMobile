import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeIngredients,
} from '@redux/slices/recipeEditorSlice';
import { IngredientType } from '@typed/recipe-types';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import IngredientList from './ingredient-list';
import IngredientForm from './ingredient-form';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeIngredientsEditor = ({ recipeData }: PropsType) => {
  const [ingredients, setIngredients] = React.useState(
    recipeData.recipeData.ingredients,
  );
  const [openIngredientForm, setOpenIngredientForm] = React.useState(false);

  const noIngredients = ingredients.length === 0;
  console.log(recipeData);
  const dispatch = useDispatch();

  const openIngredient = () => {
    setOpenIngredientForm(true);
  };

  const addNewIngredient = (newIngredient: IngredientType) => {
    setIngredients([...ingredients, newIngredient]);
    setOpenIngredientForm(false);
  };

  const handleBack = () => {
    dispatch(updateRecipeIngredients(ingredients));
    dispatch(changeCurrentStep(1));
  };

  const handleNext = () => {
    dispatch(updateRecipeIngredients(ingredients));
    dispatch(changeCurrentStep(3));
  };

  return (
    <View style={styles.container}>
      {openIngredientForm ? (
        <IngredientForm addNewIngredient={addNewIngredient} />
      ) : (
        <>
          <Text>Ingredients</Text>
          {noIngredients ? (
            <Text>No Ingredients</Text>
          ) : (
            <IngredientList ingredients={ingredients} />
          )}
          <Button title="Add New" onPress={openIngredient} />
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={handleBack} />
            <Button title="Next" onPress={handleNext} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default RecipeIngredientsEditor;
