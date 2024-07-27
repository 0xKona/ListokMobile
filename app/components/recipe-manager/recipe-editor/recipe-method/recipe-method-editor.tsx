import {
  changeCurrentStep,
  RecipeEditorState,
  updateRecipeMethod,
} from '@redux/slices/recipeEditorSlice';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { MethodStepType } from '@typed/recipe-types';
import StepForm from './step-form';
import StepList from './step-list';

interface PropsType {
  recipeData: RecipeEditorState;
}

const RecipeMethodEditor = ({ recipeData }: PropsType) => {
  const [steps, setSteps] = React.useState<MethodStepType[]>(
    recipeData.recipeData.method,
  );

  useEffect(() => {
    setSteps(recipeData.recipeData.method);
  }, [recipeData]);

  const [openStepForm, setOpenStepForm] = React.useState(false);
  const noSteps = steps.length === 0;
  const dispatch = useDispatch();
  const theme = useTheme(styles);

  const openStep = () => {
    setOpenStepForm(true);
  };

  const addNewStep = (newStep: string) => {
    const updatedSteps = [...steps, { index: steps.length + 1, step: newStep }];
    setSteps(updatedSteps);
    setOpenStepForm(false);
  };

  const handleBack = () => {
    dispatch(updateRecipeMethod(steps));
    dispatch(changeCurrentStep(2));
  };

  const handleNext = () => {
    dispatch(updateRecipeMethod(steps));
    dispatch(changeCurrentStep(4));
  };

  return (
    <>
      <View style={theme.container}>
        {openStepForm ? (
          <StepForm
            addNewStep={addNewStep}
            closeForm={() => setOpenStepForm(false)}
          />
        ) : (
          <>
            <Text style={theme.titleText}>Steps</Text>
            <TouchableOpacity onPress={openStep} style={theme.addNewButton}>
              <>
                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <Text style={{ color: '#007AFF' }}>Add New </Text>
                <Icon name="add-circle-outline" size={20} color={'#007AFF'} />
              </>
            </TouchableOpacity>
            <View style={theme.stepContainer}>
              {noSteps ? (
                <Text style={{ alignSelf: 'center' }}>No Steps</Text>
              ) : (
                <StepList steps={steps} setSteps={setSteps} />
              )}
            </View>
          </>
        )}
      </View>
      <View style={theme.buttonContainer}>
        <Button title="Back" onPress={handleBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.surface,
      flexGrow: 1,
      padding: 20,
      margin: 20,
    },
    addNewButton: {
      width: '100%',
      color: 'lightblue',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 30,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 'auto',
      marginBottom: 20,
    },
    titleText: {
      alignSelf: 'center',
      fontSize: 20,
      marginBottom: 20,
    },
    stepContainer: {
      width: '100%',
      flexDirection: 'column',
      maxHeight: '85%',
    },
  });

export default RecipeMethodEditor;