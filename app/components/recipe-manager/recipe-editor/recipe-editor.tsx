import { RootState } from '@redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionOne from './section-one';
import SectionThree from './section-three';
import SectionTwo from './section-two';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { resetRecipeEditor } from '@redux/slices/recipeEditorSlice';

const RecipeEditor = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const backButton = navigation.addListener('beforeRemove', e => {
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
  }, [dispatch, navigation]);
  const recipeState = useSelector((state: RootState) => state.recipeEditor);

  console.log('Recipe State:: ', recipeState);

  switch (recipeState.currentStep) {
    case 1:
      return <SectionOne recipeData={recipeState} />;
    case 2:
      return <SectionTwo recipeData={recipeState} />;
    case 3:
      return <SectionThree recipeData={recipeState} />;
  }
};

export default RecipeEditor;
