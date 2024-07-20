import useTheme from '@app/components/hooks/useTheme';
import { recipeTabs } from '@app/constants/recipe-tabs';
import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

interface PropsType {
  currentTab: string;
  handlePressTab: (tab: string) => void;
}

const RecipeTabs = ({ currentTab, handlePressTab }: PropsType) => {
  const componentStyle = useTheme(styles);
  const selectedStyle = (selected: boolean) => {
    return selected
      ? {
          ...componentStyle.tab,
          borderBottomWidth: 2,
          borderBottomColor: 'black',
        }
      : componentStyle.tab;
  };

  return (
    <View style={componentStyle.container}>
      {recipeTabs.map((tab: any) => (
        <TouchableHighlight
          style={selectedStyle(currentTab === tab.value)}
          onPress={() => handlePressTab(tab.value)}
          key={tab.value}>
          <Text>{tab.text}</Text>
        </TouchableHighlight>
      ))}
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
  });

export default RecipeTabs;
