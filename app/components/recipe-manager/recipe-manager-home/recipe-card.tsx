import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager-api';
import { useNavigation } from '@react-navigation/native';
import { openRecipeEditor } from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import { RecipeNavigationProp } from '@typed/navigation';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActionInterface, actionSheet } from '@app/components/ui/action-sheet';

interface PropsType {
  data: any;
  refreshRecipes: () => void;
}

const RecipeCard = ({ data, refreshRecipes }: PropsType) => {
  const navigation = useNavigation<RecipeNavigationProp>();

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme(styles);

  const handleDeleteRecipe = () => {
    recipeManagerApis.deleteRecipe(data.id, user?.token);
    refreshRecipes();
  };

  const confirmDelete = () => {
    const actions: ActionInterface[] = [{actionName: 'Delete this recipe', actionFunction: handleDeleteRecipe}];

    actionSheet(actions, 1);
  }

  const openRecipe = () => {
    dispatch(openRecipeEditor(data));
    navigation.navigate('New Recipe');
  };

  const renderRightAction = () => (
    <TouchableOpacity style={{height: 75, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}} onPress={confirmDelete}>
      <Icon name='trash-alt' size={20} color={'white'}/>
    </TouchableOpacity>
  )

  return (
    <Swipeable renderRightActions={renderRightAction} overshootRight={false} >
      <View style={theme.container}>
        <View style={theme.titleContainer}>
          <Text>{data.title}</Text>
          <Text>{data.desc}</Text>
        </View>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <TouchableOpacity style={{ marginLeft: 'auto', height: 75, aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}} onPress={openRecipe} >
          <Icon name='edit' size={20}/>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: props.surface,
      marginBottom: 2,
      height: 75,
      flexDirection: 'row'
    },
    titleContainer: {
      height: '100%',
      justifyContent: 'center',
      padding: 20,
    }
  });

export default RecipeCard;
