import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListokManagerTabInterface } from '../listok-manager';
import ListokTabs from './listok-header-tabs';
import ListokButton from '@app/components/ui/button';

interface PropsInterface {
  currentTab: any;
  handlePressTab: (tab: ListokManagerTabInterface) => void;
}

const ListoksHeader = ({ currentTab, handlePressTab }: PropsInterface) => {
  return (
    <View style={styles.container}>
      <ListokTabs currentTab={currentTab} handlePressTab={handlePressTab} />
      <View style={styles.button}>
        <ListokButton onPress={() => {}} text="New Listok" />
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
