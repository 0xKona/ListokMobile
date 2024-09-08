import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  ListokManagerTabInterface,
  ListokManagerTabs,
} from '../listok-manager';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import ListokButton from '@app/components/ui/button';
import { resetListokEditor } from '@redux/slices/listokEditorSlice';
import { useNavigation } from '@react-navigation/native';
import { ListokNavigationProp } from '@typed/navigation';

interface PropsInterface {
  currentTab: ListokManagerTabInterface;
  handlePressTab: (tab: ListokManagerTabInterface) => void;
}

const ListokTabs = ({ currentTab, handlePressTab }: PropsInterface) => {
  const dispatch = useDispatch();
  const theme = useTheme(styles);
  const navigation = useNavigation<ListokNavigationProp>();
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const selectedStyle = (selected: boolean, tabIndex: number) => {
    const borderRadius = {
      borderTopLeftRadius: tabIndex === 0 && 5,
      borderTopRightRadius: tabIndex === ListokManagerTabs.length - 1 && 5
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

  const handleOpenNewListok = () => {
    dispatch(resetListokEditor());
    navigation.navigate('New Listok');
  };

  return (
    <View style={theme.container}>
      {ListokManagerTabs.map((tab: any, index: number) => (
        <TouchableHighlight
          style={selectedStyle(currentTab.value === tab.value, index)}
          onPress={() => handlePressTab(tab)}
          key={tab.value}>
          <Text style={theme.tabText}>{tab.name}</Text>
        </TouchableHighlight>
      ))}
      <ListokButton
        onPress={handleOpenNewListok}
        text="New Listok"
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

export default ListokTabs;
