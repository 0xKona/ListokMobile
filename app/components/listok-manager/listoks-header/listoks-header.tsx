import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListokManagerTabInterface } from '../listok-manager';
import ListokTabs from './listok-header-tabs';
import ListokButton from '@app/components/ui/button';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetListokEditor } from '@redux/slices/listokEditorSlice';
import { ListokNavigationProp } from '@typed/navigation';

interface PropsInterface {
  currentTab: any;
  handlePressTab: (tab: ListokManagerTabInterface) => void;
}

const ListoksHeader = ({ currentTab, handlePressTab }: PropsInterface) => {
  return (
    <View style={styles.container}>
      <ListokTabs currentTab={currentTab} handlePressTab={handlePressTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListoksHeader;
