import useTheme from '@app/components/hooks/useTheme';
import ListokInput from '@app/components/ui/input';
import { ThemeType } from '@app/constants/themes';
import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeDesc,
  updateRecipeTitle,
} from '@redux/slices/recipeEditorSlice';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeDetailsEditor = ({ recipeData }: PropsType) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState<string>(recipeData.recipeData.title);
  const [desc, setDesc] = React.useState<string>(recipeData.recipeData.desc);

  const theme = useTheme(styles);

  const handleNextPress = () => {
    // TODO Verify fields here
    dispatch(updateRecipeTitle(title));
    dispatch(updateRecipeDesc(desc));
    dispatch(changeCurrentStep(2));
  };

  const updateTitle = () => dispatch(updateRecipeTitle(title));
  const updateDesc = () => dispatch(updateRecipeDesc(desc));

  return (
    <>
      <View style={theme.container}>
        <Text style={theme.titleText}>Recipe Details</Text>

        <View style={theme.inputSection}>
          <Text>Recipe Name:</Text>
          <ListokInput
            value={title}
            onChangeText={setTitle}
            onEndEditing={updateTitle}
          />
        </View>

        <View style={theme.inputSection}>
          <Text>Recipe Description:</Text>
          <ListokInput
            value={desc}
            onChangeText={setDesc}
            onEndEditing={updateDesc}
          />
        </View>
      </View>
      <View style={theme.buttonContainer}>
        <Button title="Next" onPress={handleNextPress} />
      </View>
    </>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      padding: 20,
      margin: 20,
    },
    titleText: {
      alignSelf: 'center',
      fontSize: 20,
      marginBottom: 20,
    },
    inputSection: {
      marginTop: 10,
    },
    buttonContainer: {
      marginTop: 'auto',
      marginBottom: 20,
    },
  });

export default RecipeDetailsEditor;
