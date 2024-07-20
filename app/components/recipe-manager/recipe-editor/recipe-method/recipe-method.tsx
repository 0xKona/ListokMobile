import {
  changeCurrentStep,
  RecipeEditorState,
} from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeMethodEditor = ({ recipeData }: PropsType) => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  console.log(recipeData);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(changeCurrentStep(4));
  };

  const handleBack = () => {
    dispatch(changeCurrentStep(2));
  };

  return (
    <View>
      <Text>SectionThree</Text>

      <Button title="Back" onPress={handleBack} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default RecipeMethodEditor;
