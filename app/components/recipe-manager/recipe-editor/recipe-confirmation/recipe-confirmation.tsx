import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import useTheme from '@app/components/hooks/useTheme';
import { changeCurrentStep, submitRecipe } from '@redux/slices/recipeEditorSlice';
import { ThemeType } from '@app/constants/themes';
import { AppDispatch } from '@redux/store';
import { useNavigation } from '@react-navigation/native';
import { RecipeNavigationProp } from '@typed/navigation';

const RecipeEditorConfirmation = ({ recipeData, setIgnorePopup }: any) => {
  const navigation = useNavigation<RecipeNavigationProp>()
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme(styles);

  const handleBack = () => {
    dispatch(changeCurrentStep(3));
  };

  const handleSubmit = () => {
    setIgnorePopup(true);
    dispatch(submitRecipe());
    navigation.navigate('Your Recipes');
  };

  return (
    <ScrollView style={theme.container}>
      <Text style={theme.titleText}>Confirm</Text>
      <View style={theme.section}>
        <Text style={theme.label}>Title:</Text>
        <Text style={theme.value}>{recipeData.recipeData.title}</Text>
      </View>
      <View style={theme.section}>
        <Text style={theme.label}>Description:</Text>
        <Text style={theme.value}>{recipeData.recipeData.desc}</Text>
      </View>
      <View style={theme.section}>
        <Text style={theme.label}>Created By:</Text>
        <Text style={theme.value}>{recipeData.recipeData.createdByName}</Text>
      </View>
      <View style={theme.section}>
        <Text style={theme.label}>Ingredients:</Text>
        {recipeData.recipeData.ingredients.map(
          (ingredient: any, index: number) => (
            <Text key={index} style={theme.value}>
              {ingredient.name} - {ingredient.amount} {ingredient.measurement}
            </Text>
          ),
        )}
      </View>
      <View style={theme.section}>
        <Text style={theme.label}>Method:</Text>
        {recipeData.recipeData.method.map((step: any, index: number) => (
          <Text key={index} style={theme.value}>
            {index + 1}. {step.step}
          </Text>
        ))}
      </View>
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
