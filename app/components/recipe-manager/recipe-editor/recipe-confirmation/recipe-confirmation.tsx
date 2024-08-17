import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import useTheme from '@app/components/hooks/useTheme';
import { changeCurrentStep, submitRecipe } from '@redux/slices/recipeEditorSlice';
import { ThemeType } from '@app/constants/themes';
import { AppDispatch } from '@redux/store';

const RecipeEditorConfirmation = ({ recipeData, setIgnorePopup }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme(styles);

  const handleBack = () => {
    dispatch(changeCurrentStep(3));
  };

  const handleSubmit = () => {
    setIgnorePopup(true);
    dispatch(submitRecipe());
  };

  return (
    <ScrollView style={theme.container}>
      <Text style={theme.titleText}>Confirm</Text>
      {/* Confirmation UI elements */}
      <View style={theme.buttonContainer}>
        <Button title="Back" onPress={handleBack} />
        <Button title="Submit Recipe" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.surface,
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
    },
    section: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      // color: theme.primary,
    },
    value: {
      fontSize: 16,
      // color: theme.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
  });

export default RecipeEditorConfirmation;
