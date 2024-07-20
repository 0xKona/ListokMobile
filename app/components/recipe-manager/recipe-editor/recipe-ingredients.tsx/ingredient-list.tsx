import { IngredientType } from '@typed/recipe-types';
import React from 'react';
import { Text, View } from 'react-native';

interface PropsInterface {
  ingredients: IngredientType[];
}

const IngredientList = ({ ingredients }: PropsInterface) => {
  return (
    <>
      {ingredients.map((ingredient: IngredientType) => (
        <View key={ingredient.name}>
          <Text>{ingredient.name}</Text>
        </View>
      ))}
    </>
  );
};

export default IngredientList;
