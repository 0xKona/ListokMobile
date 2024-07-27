import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { days } from '@app/constants/utility';
import { useNavigation } from '@react-navigation/native';
import { setDayToSelectRecipes } from '@redux/slices/listokEditorSlice';
import { ListokNavigationProp } from '@typed/navigation';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

interface PropsInterface {
  index: number;
}

const WeekdayCard = ({ index }: PropsInterface) => {
  const theme = useTheme(styles);
  const dispatch = useDispatch();
  const navigation = useNavigation<ListokNavigationProp>();

  const handlePress = () => {
    dispatch(setDayToSelectRecipes(index));
    navigation.navigate('Select Recipes');
  };

  return (
    <TouchableOpacity style={theme.container} onPress={handlePress}>
      <Text>{days[index]}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 70,
      backgroundColor: theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default WeekdayCard;
