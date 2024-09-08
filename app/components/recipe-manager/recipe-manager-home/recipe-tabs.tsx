import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import { recipeTabs } from '@app/constants/recipe-tabs';
import { ThemeType } from '@app/constants/themes';
import { useNavigation } from '@react-navigation/native';
import { resetRecipeEditor } from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import { RecipeNavigationProp } from '@typed/navigation';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsType {
  currentTab: string;
  handlePressTab: (tab: string) => void;
}

const RecipeTabs = ({ currentTab, handlePressTab }: PropsType) => {
  
  const theme = useTheme(styles);
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const navigation = useNavigation<RecipeNavigationProp>();

  const selectedStyle = (selected: boolean, tabIndex: number) => {
    const borderRadius = {
      borderTopLeftRadius: tabIndex === 0 && 5,
      borderTopRightRadius: tabIndex === recipeTabs.length - 1 && 5
    }
    return selected
      ? {
          ...theme.tab,
          ...borderRadius,
          borderBottomWidth: 4,
          borderBottomColor: currentTheme.highlight
        }
      : {...theme.tab,
        ...borderRadius,
      };
  };

  const handleOpenNewRecipe = () => {
    dispatch(resetRecipeEditor());
    navigation.navigate('New Recipe');
  };

  return (
    <View style={theme.container}>
      {recipeTabs.map((tab: any, index: number) => (
        <TouchableOpacity
          style={selectedStyle(currentTab === tab.value, index)}
          onPress={() => handlePressTab(tab.value)}
          key={tab.value}>
          <Text style={theme.tabText}>{tab.text}</Text>
        </TouchableOpacity>
      ))}
      <ListokButton
        onPress={handleOpenNewRecipe}
        text="New Recipe"
        propStyles={theme.newRecipeButton}
      />
    </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
    },
    tab: {
      backgroundColor: theme.surface,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      minWidth: 100,
    },
    tabText: {
      color: theme.surfaceText
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
