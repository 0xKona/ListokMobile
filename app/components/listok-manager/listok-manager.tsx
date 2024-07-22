import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListoksHeader from './listoks-header/listoks-header';

export interface ListokManagerTabInterface {
  name: 'Your Listoks' | 'Imported Listoks';
  value: 'users' | 'imported';
}

export const ListokManagerTabs: ListokManagerTabInterface[] = [
  { name: 'Your Listoks', value: 'users' },
  { name: 'Imported Listoks', value: 'imported' },
];

const ListokManager = () => {
  const [currentTab, setCurrentTab] = React.useState<ListokManagerTabInterface>(
    ListokManagerTabs[0],
  );

  const handlePressTab = (tab: ListokManagerTabInterface) => {
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      <ListoksHeader currentTab={currentTab} handlePressTab={handlePressTab} />
      <Text>ListokManager</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ListokManager;
