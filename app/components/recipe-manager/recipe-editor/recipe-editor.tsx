import { RootState } from '@redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { resetRecipeEditor } from '@redux/slices/recipeEditorSlice';
import RecipeDetailsEditor from './recipe-details/recipe-details';
import RecipeIngredientsEditor from './recipe-ingredients.tsx/recipe-ingredients';
import RecipeMethodEditor from './recipe-method/recipe-method-editor';
import RecipeEditorConfirmation from './recipe-confirmation/recipe-confirmation';

// TODO : Fix when to display discard popup

const RecipeEditor = () => {
  const [ignorePopup, setIgnorePopup] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log('Ignore Popup:', ignorePopup);

  React.useEffect(() => {
    const backButton = navigation.addListener('beforeRemove', e => {
      if (ignorePopup) {
        dispatch(resetRecipeEditor());
        setIgnorePopup(false);
        return;
      }
      e.preventDefault();

      Alert.alert(
        'Lose Changes?',
        'You will lose any changes to your recipe, Are you sure you wish to discard them?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              dispatch(resetRecipeEditor());
              navigation.dispatch(e.data.action);
            },
          },
        ],
      );
    });

    return backButton;
  }, [dispatch, ignorePopup, navigation]);

  const recipeState = useSelector((state: RootState) => state.recipeEditor);

  console.log('Recipe State:: ', recipeState);

  switch (recipeState.currentStep) {
    case 1:
      return <RecipeDetailsEditor recipeData={recipeState} />;
    case 2:
      return <RecipeIngredientsEditor recipeData={recipeState} />;
    case 3:
      return <RecipeMethodEditor recipeData={recipeState} />;
    case 4:
      return (
        <RecipeEditorConfirmation
          recipeData={recipeState}
          setIgnorePopup={setIgnorePopup}
        />
      );
    default:
      return null; // Return null for safety if no cases match
  }
};

export default RecipeEditor;
