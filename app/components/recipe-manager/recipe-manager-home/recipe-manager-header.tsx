import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from '../../ui/search';
import ListokButton from '../../ui/button';
import useTheme from '../../hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { useNavigation } from '@react-navigation/native';
import { RecipeNavigationProp } from '@typed/navigation';

const RecipeHeader = () => {
  const componentStyles = useTheme(styles);
  const navigation = useNavigation<RecipeNavigationProp>();

  return (
    <View style={componentStyles.container}>
      <SearchBar />
      <ListokButton
        onPress={() => navigation.navigate('New Recipe')}
        text="New Recipe"
        // eslint-disable-next-line react-native/no-inline-styles
        propStyles={{ width: '30%', height: '100%' }}
      />
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: 60,
      backgroundColor: props.surface,
      padding: 10,
    },
  });

export default RecipeHeader;
