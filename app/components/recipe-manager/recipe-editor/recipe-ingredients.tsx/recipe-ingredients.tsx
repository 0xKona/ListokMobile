import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeIngredients,
} from '@redux/slices/recipeEditorSlice';
import { IngredientType } from '@typed/recipe-types';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import IngredientList from './ingredient-list';
import IngredientForm from './ingredient-form';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import ListokButton from '@app/components/ui/button';

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
            <TouchableOpacity
              onPress={openIngredient}
              style={theme.addNewButton}>
              <>
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <Text style={{ color: '#007AFF' }}>Add New </Text>
                <Icon name="add-circle-outline" size={20} color={'#007AFF'} />
              </>
            </TouchableOpacity>
            {noIngredients ? (
              <View style={theme.noIngredients}>
                <Text style={theme.noIngredientsText}>{'No Ingredients \n Press Add New to add a new ingredient!'}</Text>
              </View>
            ) : (
              <IngredientList ingredients={ingredients} />
            )}
          </>
        )}
      </View>
      {!openIngredientForm && (
        <View style={theme.buttonContainer}>
          <ListokButton text="Back" onPress={handleBack} propStyles={{width: '35%', borderRadius: 5}}/>
          <ListokButton text="Next" onPress={handleNext} propStyles={{width: '35%', borderRadius: 5}}/>
        </View>
      )}
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
      height: '99%',
      borderRadius: 10
    },
    addNewButton: {
      width: '100%',
      color: 'lightblue',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 30,
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
      color: theme.surfaceText
    },
    noIngredients: {
      height: '100%', 
      marginTop: 50
    },
    noIngredientsText: {
      textAlign: 'center',
      color: theme.surfaceText
    }
  });

export default RecipeIngredientsEditor;
