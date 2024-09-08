import React from 'react';
import ListokInput from '@app/components/ui/input';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CategoryType, MeasurementType } from '@typed/recipe-types';
import {
  ingredientCategoryOptions,
  ingredientMeasurementOptions,
} from '@app/constants/ingredients';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import ListokPicker from '@app/components/ui/picker';
import { useAlert } from '@app/components/ui/alert';

const IngredientForm = ({ addNewIngredient, closeForm }: any) => {
  const [ingredientName, setIngredientName] = React.useState('');
  const [ingredientAmount, setIngredientAmount] = React.useState<number>(0);
  const [ingredientMeasurement, setIngredientMeasurement] =
    React.useState<MeasurementType>('units');
  const [ingredientCategory, setIngredientCategory] =
    React.useState<CategoryType>('fruit');

  const theme = useTheme(styles);

  const handleSubmit = () => {
    addNewIngredient({
      name: ingredientName,
      amount: ingredientAmount,
      measurement: ingredientMeasurement,
      category: ingredientCategory,
    });
  };

  const handleClose = () => {
    closeForm();
    setIngredientName('');
    setIngredientAmount(0);
    setIngredientMeasurement('units');
    setIngredientCategory('fruit');
  };

  const handlePressClose = () => {
    useAlert('Lose Ingredient without saving?', 'You will lose this ingredient', [{text: 'Close', style: 'destructive', onPress: handleClose}])
  }

  return (
    <>
      <View style={theme.closeButtonContainer}>
        <Text style={theme.title}>Add New Ingredient</Text>
        <TouchableOpacity onPress={handlePressClose}>
          <Icon name="closecircle" size={20} color={theme.title.color}/>
        </TouchableOpacity>
      </View>

      <View style={theme.container}>
        <View style={theme.formSection}>
          {/* <Text>Ingredient Name:</Text> */}
          <ListokInput
            inputName='Ingredient Name'
            value={ingredientName}
            onChangeText={setIngredientName}
            backgroundColor={theme.container.backgroundColor}
            textColor={theme.title.color}
          />
        </View>

        <View style={theme.formSection}>
          {/* <Text>Ingredient Amount:</Text> */}
          <ListokInput
            inputName='Amount'
            value={ingredientAmount}
            onChangeText={setIngredientAmount}
            type="number"
            backgroundColor={theme.container.backgroundColor}
            textColor={theme.title.color}
          />
        </View>

        <ListokPicker 
          label='Amount Measurement'
          backgroundColor={theme.container.backgroundColor}
          state={ingredientMeasurement}
          setState={setIngredientMeasurement}
          items={ingredientMeasurementOptions}
          textColor={theme.title.color}
        />

        <ListokPicker 
          label='Category' 
          backgroundColor={theme.container.backgroundColor} 
          state={ingredientCategory} setState={setIngredientCategory} 
          items={ingredientCategoryOptions}
          textColor={theme.title.color}
        />

        <View style={theme.submitButton}>
          <ListokButton text="Submit" onPress={handleSubmit} propStyles={{borderRadius: 5}}/>
        </View>
      </View>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      display: 'flex',
      width: '100%',
      flexGrow: 1
    },
    closeButtonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    title: {
      fontSize: 20,
      color: theme.surfaceText
    },
    formSection: {
      marginBottom: 10,
    },
    dropdown: {
      width: '100%',
      borderBlockColor: 'black',
      borderWidth: 1,
      padding: 10,
      flexDirection: 'row',
    },
    submitButton: {
      marginTop: "auto",
      marginBottom: 10
    }
  });

export default IngredientForm;
