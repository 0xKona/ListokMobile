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
  const dispatch = useDispatch();
  const navigation = useNavigation<ListokNavigationProp>();

  const handleOpenNewListok = () => {
    dispatch(resetListokEditor());
    navigation.navigate('New Listok');
  };
  return (
    <View style={styles.container}>
      <ListokTabs currentTab={currentTab} handlePressTab={handlePressTab} />
      <View style={styles.button}>
        <ListokButton onPress={handleOpenNewListok} text="New Listok" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexGrow: 1,
    paddingLeft: 20,
  },
});

export default ListoksHeader;
