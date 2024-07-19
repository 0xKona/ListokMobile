import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager-api';
import { useNavigation } from '@react-navigation/native';
import { changeCurrentStep } from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import { RecipeNavigationProp } from '@typed/navigation';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const RecipeEditorConfirmation = ({ recipeData, setIgnorePopup }: any) => {
  const navigation = useNavigation<RecipeNavigationProp>();
  const { user } = useSelector((state: RootState) => state.user);
  console.log('User State Token at Confirmation Screen:', user.token);
  console.log('RecipeData.existing: ', recipeData.existingRecipe);
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(changeCurrentStep(3));
  };

  const handleSubmit = async () => {
    if (recipeData.existingRecipe) {
      console.log('Existing Recipe Submit Triggered: ', recipeData.recipeData);
      try {
        setIgnorePopup(true);
        await recipeManagerApis.updateExistingRecipe(
          JSON.stringify(recipeData.recipeData),
          user.token,
        );
        navigation.navigate('Your Recipes');
      } catch (error) {
        console.log('Error submitting changes: ', error);
      }
    } else {
      try {
        console.log('recipeSubmitted: ', recipeData.recipeData);
        setIgnorePopup(true);
        await recipeManagerApis.postNewRecipe(
          JSON.stringify({
            ...recipeData.recipeData,
            createdBy: user.userId,
            createdByName: user.name,
          }),
          user.token,
        );
        navigation.navigate('Your Recipes');
      } catch (error) {
        console.error('Error submitting recipe:', error);
        setIgnorePopup(false);
      }
    }
  };

  return (
    <View>
      <Text>Confirmation Screen</Text>

      <View>
        <Button title="Back" onPress={handleBack} />
        <Button title="Submit Recipe" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default RecipeEditorConfirmation;
