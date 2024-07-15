import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager';
import { changeCurrentStep } from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const RecipeEditorConfirmation = ({ recipeData }: any) => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log('User State Token at Confirmation Screen:', user.token);
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(changeCurrentStep(3));
  };

  const handleSubmit = async () => {
    try {
      console.log('recipeSubmitted: ', recipeData.recipeData);
      await recipeManagerApis.postNewRecipe(
        JSON.stringify({
          ...recipeData.recipeData,
          createdBy: { userId: user.userId, name: user.name },
        }),
        user.token,
      );
    } catch (error) {
      console.error('Error submitting recipe:', error);
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
