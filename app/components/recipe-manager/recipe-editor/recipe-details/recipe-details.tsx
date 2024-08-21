import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import useTheme from '@app/components/hooks/useTheme';
import ListokInput from '@app/components/ui/input';
import { ThemeType } from '@app/constants/themes';
import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeDesc,
  updateRecipeTitle,
  updateRecipePicture,
} from '@redux/slices/recipeEditorSlice';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeDetailsEditor = ({ recipeData }: PropsType) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState<string>(recipeData.recipeData.title);
  const [desc, setDesc] = React.useState<string>(recipeData.recipeData.desc);
  const [image, setImage] = React.useState<any>(recipeData.recipeData.picture);
  const [localImage, setLocalImage] = React.useState<any>(null);

  const theme = useTheme(styles);

  useEffect(() => {
    if (typeof image === 'string') {
      // Load the image from the URL (Google Cloud Storage)
      setLocalImage({ uri: image });
    } else {
      setLocalImage(image);
    }
  }, [image]);

  const handleNextPress = () => {
    dispatch(updateRecipeTitle(title));
    dispatch(updateRecipeDesc(desc));
    dispatch(updateRecipePicture(localImage)); // Store the full image object or URL
    dispatch(changeCurrentStep(2));
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          if (selectedImage) {
            setLocalImage(selectedImage); // Store the entire image object
          }
        }
      }
    );
  };

  const deleteImage = () => {
    Alert.alert(
      'Delete Image?',
      'Are you sure you want to delete this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setLocalImage(null); // Remove the image
            dispatch(updateRecipePicture('')); // Clear the image from the store
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={theme.container}>
        <Text style={theme.titleText}>Recipe Details</Text>

        <View style={theme.inputSection}>
          <Text>Recipe Name:</Text>
          <ListokInput
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={theme.inputSection}>
          <Text>Recipe Description:</Text>
          <ListokInput
            value={desc}
            onChangeText={setDesc}
          />
        </View>

        <View style={theme.inputSection}>
          <Button title="Pick an image" onPress={pickImage} />
          {localImage && (
            <>
              <Image source={{ uri: localImage.uri }} style={{ width: 200, height: 200 }} />
              <Button title="Delete Image" onPress={deleteImage} color="red" />
            </>
          )}
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
