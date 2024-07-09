import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeDesc,
  updateRecipeTitle,
} from '@redux/slices/recipeEditorSlice';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const SectionOne = ({ recipeData }: PropsType) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState<string>(recipeData.recipeData.title);
  const [desc, setDesc] = React.useState<string>(recipeData.recipeData.desc);

  const handleNextPress = () => {
    // TODO Verify fields here
    dispatch(updateRecipeTitle(title));
    dispatch(updateRecipeDesc(desc));

    dispatch(changeCurrentStep(2));
  };

  return (
    <View>
      <Text>SectionOne</Text>

      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={desc} onChangeText={setDesc} />

      <Button title="Next" onPress={handleNextPress} />
    </View>
  );
};

export default SectionOne;
