import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  ListokManagerTabInterface,
  ListokManagerTabs,
} from '../listok-manager';

interface PropsInterface {
  currentTab: ListokManagerTabInterface;
  handlePressTab: (tab: ListokManagerTabInterface) => void;
}

const ListokTabs = ({ currentTab, handlePressTab }: PropsInterface) => {
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
      {ListokManagerTabs.map((tab: any) => (
        <TouchableHighlight
          style={selectedStyle(currentTab.value === tab.value)}
          onPress={() => handlePressTab(tab)}
          key={tab.value}>
          <Text>{tab.name}</Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
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
  });

export default ListokTabs;
