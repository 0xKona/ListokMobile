import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager';
import {
  changeCurrentStep,
  RecipeEditorState,
} from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsType {
  recipeData: RecipeEditorState;
}

const SectionThree = ({ recipeData }: PropsType) => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  console.log(recipeData);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>SectionThree</Text>

      <Button title="Back" onPress={() => dispatch(changeCurrentStep(2))} />
      <Button
        title="Temp Submit"
        onPress={() =>
          recipeManagerApis.postNewRecipe(
            JSON.stringify(recipeData.recipeData),
            user.userInfo.token,
          )
        }
      />
    </View>
  );
};

export default SectionThree;
