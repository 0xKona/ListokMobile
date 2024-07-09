import {
  changeCurrentStep,
  RecipeEditorState,
} from '@redux/slices/recipeEditorSlice';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const SectionTwo = ({ recipeData }: PropsType) => {
  console.log(recipeData);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>SectionTwo</Text>

      <Button title="Back" onPress={() => dispatch(changeCurrentStep(1))} />
      <Button title="Next" onPress={() => dispatch(changeCurrentStep(3))} />
    </View>
  );
};

export default SectionTwo;
