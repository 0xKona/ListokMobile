import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { fetchRecipes } from '@redux/slices/recipeManagerSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import ListokSelectionRecipeCard from './recipe-card';
import ListokButton from '@app/components/ui/button';
import { useNavigation } from '@react-navigation/native';

const ListokRecipeSelector = () => {
  const theme = useTheme(styles);
  const { userId, token } = useSelector((state: RootState) => state.user.user);
  const { userRecipes } = useSelector(
    (state: RootState) => state.recipeManager,
  );
  const { listokData, selectingRecipesForDay } = useSelector(
    (state: RootState) => state.listokEditor,
  );
  const navigation = useNavigation();

  const day = Object.keys(listokData.days)[selectingRecipesForDay];
  console.log('Selecting Recipes for day: ', day);
  console.log('Selected Recipes for', day, ':', listokData.days)
  const handleBack = () => navigation.goBack();

  React.useEffect(() => {
    fetchRecipes({ userId: userId, token: token });
  }, [token, userId]);

  return (
    <View style={theme.background}>
      <FlatList
        data={userRecipes}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ListokSelectionRecipeCard recipe={item} day={day} />
        )}
        columnWrapperStyle={theme.row}
      />
      <ListokButton text='Back' onPress={handleBack} propStyles={{borderRadius: 5}}/>
    </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      padding: 10,
      height: '100%',
    },
    title: {
      alignSelf: 'center',
      margin: 10,
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
  });

export default ListokRecipeSelector;
