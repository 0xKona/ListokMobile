import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PropsType {
  data: any;
}

const RecipeCard = ({ data }: PropsType) => {
  const componentStyles = useTheme(styles);

  return (
    <View style={componentStyles.container}>
      <Text>{data.title}</Text>
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: props.surface,
      marginBottom: 2,
      height: 75,
      padding: 10,
    },
  });

export default RecipeCard;
