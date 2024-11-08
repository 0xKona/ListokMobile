import { RootState } from '@redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, View } from 'react-native';
import { resetRecipeEditor } from '@redux/slices/recipeEditorSlice';
import RecipeDetailsEditor from './recipe-details/recipe-details';
import RecipeIngredientsEditor from './recipe-ingredients.tsx/recipe-ingredients';
import RecipeMethodEditor from './recipe-method/recipe-method-editor';
import RecipeEditorConfirmation from './recipe-confirmation/recipe-confirmation';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';

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

  const theme = useTheme(styles);

  switch (recipeState.currentStep) {
    case 1:
      return (
        <View style={theme.container}>
          <RecipeDetailsEditor recipeData={recipeState} />
        </View>
      );
    case 2:
      return (
        <View style={theme.container}>
          <RecipeIngredientsEditor recipeData={recipeState} />
        </View>
      );
    case 3:
      return (
        <View style={theme.container}>
          <RecipeMethodEditor recipeData={recipeState} />
        </View>
      );
    case 4:
      return (
        <View style={theme.container}>
          <RecipeEditorConfirmation
            recipeData={recipeState}
            setIgnorePopup={setIgnorePopup}
          />
        </View>
      );
    default:
      return null;
  }
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  }
})

export default RecipeEditor;
