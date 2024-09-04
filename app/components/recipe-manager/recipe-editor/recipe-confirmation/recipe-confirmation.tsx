import { useNavigation } from '@react-navigation/native';
import { changeCurrentStep, submitRecipe } from '@redux/slices/recipeEditorSlice';
import { AppDispatch, RootState } from '@redux/store';
import { RecipeNavigationProp } from '@typed/navigation';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import LoadingSpinner from '@app/components/ui/loading-spinner';

const RecipeEditorConfirmation = ({ recipeData, setIgnorePopup }: any) => {
  const navigation = useNavigation<RecipeNavigationProp>();
  const { loading } = useSelector((state: RootState) => state.recipeEditor);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme(styles);

  const handleBack = () => {
    dispatch(changeCurrentStep(3));
  };

  const navigateHome = () => {
    navigation.navigate('Your Recipes');
  }

  const handleSubmit = async () => {
    setIgnorePopup(true);
    dispatch(submitRecipe(navigateHome));
    
  }

  return (
    loading ? (
      <LoadingSpinner text='Submitting Recipe' />
    ) : (
      <View style={theme.container}>
        <Text style={theme.titleText}>Confirm</Text>

        <ScrollView style={theme.details}>
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
        </ScrollView>

        <View style={theme.buttonContainer}>
          <ListokButton text="Back" onPress={handleBack} propStyles={{width: '40%', borderRadius: 5}}/>
          <ListokButton text="Submit Recipe" onPress={handleSubmit} propStyles={{width: '40%', borderRadius: 5}} />
        </View>

      </View>
    )
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.surface,
      flexGrow: 1,
      padding: 10,
      margin: 20,
      height: '100%',
      borderRadius: 10
    },
    details: {
      width: '100%',
      padding: 20
    },
    titleText: {
      marginTop: 10,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
      color: theme.surfaceText
    },
    section: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.surfaceText
    },
    value: {
      fontSize: 16,
      color: theme.surfaceText
    },
    buttonContainer: {
      width: '100%',
      marginTop: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30
    },
  });

export default RecipeEditorConfirmation;
