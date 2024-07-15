import ListokInput from '@app/components/ui/input';
import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeDesc,
  updateRecipeTitle,
} from '@redux/slices/recipeEditorSlice';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeDetailsEditor = ({ recipeData }: PropsType) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState<string>(recipeData.recipeData.title);
  const [desc, setDesc] = React.useState<string>(recipeData.recipeData.desc);

  const handleNextPress = () => {
    // TODO Verify fields here
    dispatch(updateRecipeTitle(title));
    dispatch(updateRecipeDesc(desc));
    dispatch(changeCurrentStep(2));
  };

  const updateTitle = () => dispatch(updateRecipeTitle(title));
  const updateDesc = () => dispatch(updateRecipeDesc(desc));

  return (
    <View>
      <Text>Recipe Details</Text>

      <Text>Recipe Name:</Text>

      <ListokInput
        value={title}
        onChangeText={setTitle}
        onEndEditing={updateTitle}
      />

      <Text>Recipe Description:</Text>
      <ListokInput
        value={desc}
        onChangeText={setDesc}
        onEndEditing={updateDesc}
      />

      <Button title="Next" onPress={handleNextPress} />
    </View>
  );
};

export default RecipeDetailsEditor;
