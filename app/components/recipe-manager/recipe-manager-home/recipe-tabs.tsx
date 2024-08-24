import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import { recipeTabs } from '@app/constants/recipe-tabs';
import { ThemeType } from '@app/constants/themes';
import { useNavigation } from '@react-navigation/native';
import { resetRecipeEditor } from '@redux/slices/recipeEditorSlice';
import { RecipeNavigationProp } from '@typed/navigation';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface PropsType {
  currentTab: string;
  handlePressTab: (tab: string) => void;
}

const RecipeTabs = ({ currentTab, handlePressTab }: PropsType) => {
  
  const theme = useTheme(styles);
  const dispatch = useDispatch();
  const navigation = useNavigation<RecipeNavigationProp>();

  const selectedStyle = (selected: boolean) => {
    return selected
      ? {
          ...theme.tab,
          borderBottomWidth: 2,
          borderBottomColor: 'black',
        }
      : theme.tab;
  };

  const handleOpenNewRecipe = () => {
    dispatch(resetRecipeEditor());
    navigation.navigate('New Recipe');
  };

  return (
    <View style={theme.container}>
      {recipeTabs.map((tab: any) => (
        <TouchableHighlight
          style={selectedStyle(currentTab === tab.value)}
          onPress={() => handlePressTab(tab.value)}
          key={tab.value}>
          <Text>{tab.text}</Text>
        </TouchableHighlight>
      ))}
      <ListokButton
        onPress={handleOpenNewRecipe}
        text="New Recipe"
        propStyles={theme.newRecipeButton}
      />
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
    },
    tab: {
      backgroundColor: props.surface,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      minWidth: 100,
    },
    newRecipeButton: {
      width: 110,
      height: '100%',
      marginLeft: 'auto',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    }
  });

export default RecipeTabs;
