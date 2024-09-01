import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import ImageUpload from '@app/components/ui/image-selector';
import ListokInput from '@app/components/ui/input';
import { ThemeType } from '@app/constants/themes';
import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeDesc,
  updateRecipePicture,
  updateRecipeTitle,
} from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeDetailsEditor = ({ recipeData }: PropsType) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user)

  const [title, setTitle] = React.useState<string>(recipeData.recipeData.title);
  const [invalidTitle, setInvalidTitle] = React.useState<boolean>(false);
  const [desc, setDesc] = React.useState<string>(recipeData.recipeData.desc);
  const [image, setImage] = React.useState<string>(recipeData.recipeData.picture);

  useEffect(() => {
    dispatch(updateRecipePicture(image))
  }, [image])

  const theme = useTheme(styles);
  console.log('***RECIPE TITLE:: ', title)
  const handleNextPress = () => {
    if (title.length < 1) {
      setInvalidTitle(true);
      return
    }
    // TODO Verify fields here
    dispatch(updateRecipeTitle(title));
    dispatch(updateRecipeDesc(desc));
    dispatch(updateRecipePicture(image))
    dispatch(changeCurrentStep(2));
  };

  const updateTitle = () => {
    if (title.length > 0) {
      setInvalidTitle(false);
    }
    dispatch(updateRecipeTitle(title))
  };
  const updateDesc = () => dispatch(updateRecipeDesc(desc));

  return (
      <View style={theme.container}>
        <Text style={theme.titleText}>Recipe Details</Text>

        <View style={theme.inputSection}>
          <ListokInput
            inputName='Recipe Name*'
            value={title}
            onChangeText={setTitle}
            onEndEditing={updateTitle}
            backgroundColor={theme.container.backgroundColor}
            error={invalidTitle}
          />
        </View>

        <View style={theme.inputSection}>
          <ListokInput
            inputName='Recipe Description'
            value={desc}
            onChangeText={setDesc}
            onEndEditing={updateDesc}
            multiline={true}
            backgroundColor={theme.container.backgroundColor}
          />
        </View>
        <ImageUpload image={image} setImage={setImage} authToken={user.token}/>
        <View style={theme.buttonContainer}>
          <ListokButton text="Next" onPress={handleNextPress} propStyles={{width: '40%', borderRadius: 5}}/>
        </View>
      </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      padding: 20,
      margin: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: '100%'
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
      alignItems: 'flex-end',
      marginBottom: 20,
    },
  });

export default RecipeDetailsEditor;
