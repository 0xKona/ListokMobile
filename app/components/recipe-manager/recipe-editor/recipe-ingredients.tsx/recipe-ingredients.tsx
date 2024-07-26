import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeIngredients,
} from '@redux/slices/recipeEditorSlice';
import { IngredientType } from '@typed/recipe-types';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import IngredientList from './ingredient-list';
import IngredientForm from './ingredient-form';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeIngredientsEditor = ({ recipeData }: PropsType) => {
  const [ingredients, setIngredients] = React.useState(
    recipeData.recipeData.ingredients,
  );

  useEffect(() => {
    setIngredients(recipeData.recipeData.ingredients);
  }, [recipeData]);

  const [openIngredientForm, setOpenIngredientForm] = React.useState(false);

  const noIngredients = ingredients.length === 0;
  console.log(recipeData);
  const dispatch = useDispatch();
  const theme = useTheme(styles);

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
    <>
      <View style={theme.container}>
        {openIngredientForm ? (
          <IngredientForm
            addNewIngredient={addNewIngredient}
            closeForm={() => setOpenIngredientForm(false)}
          />
        ) : (
          <>
            <Text style={theme.titleText}>Ingredients</Text>
            {noIngredients ? (
              <Text>No Ingredients</Text>
            ) : (
              <IngredientList ingredients={ingredients} />
            )}
            <Button title="Add New" onPress={openIngredient} />
          </>
        )}
      </View>
      <View style={theme.buttonContainer}>
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.surface,
      flexGrow: 1,
      padding: 20,
      margin: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 'auto',
      marginBottom: 20,
    },
    titleText: {
      alignSelf: 'center',
      fontSize: 20,
      marginBottom: 20,
    },
  });

// const styles = (theme: ThemeType) =>
//   StyleSheet.create({
//     container: {
//       backgroundColor: theme.surface,
//       padding: 20,
//       margin: 20,
//     },
//     titleText: {
//       alignSelf: 'center',
//       fontSize: 20,
//       marginBottom: 20,
//     },
//     inputSection: {
//       marginTop: 10,
//     },
//     buttonContainer: {
//       marginTop: 'auto',
//       marginBottom: 20,
//     },
//   });

export default RecipeIngredientsEditor;
