// TODO - Honestly this is just awful and needs to be complely redone at some point if I have time

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchListoks } from '@redux/slices/listokManagerSlice';
import { setSelectedListok } from '@redux/slices/shoppingManagerSlice';
import { ListokInterface } from '@typed/listok-types';
import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';

interface DropdownItem {
  label: string;
  value: string;
}

const ListokDropdownSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userListoks } = useSelector(
    (state: RootState) => state.listokManager,
  );
  const { userId, token } = useSelector((state: RootState) => state.user.user);
  const { selectedListok } = useSelector(
    (state: RootState) => state.shoppingManager,
  );
  const theme = useTheme(styles);

  const [items, setItems] = useState<DropdownItem[]>([]);
  const [value, setValue] = useState<string | null>(selectedListok);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const refreshListoks = () => {
    dispatch(fetchListoks({ userId, token }));
  };

  useEffect(() => {
    refreshListoks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  useEffect(() => {
    if (userListoks.length > 0) {
      const dropdownItems = userListoks.map((listok: ListokInterface) => ({
        label: listok.title || '',
        value: listok.id || '',
      }));
      setItems(dropdownItems);
    }
  }, [userListoks]);

  const handleSelect = (listokId: string | null) => {
    if (listokId === null) {
      return;
    }
    if (isFirstLoad) {
      // This stops alert showing on page load
      setIsFirstLoad(false);
      return;
    }
    if (isAlertVisible) {
      // Prevents multiple alerts from showing
      return;
    }
    setIsAlertVisible(true); // Set alert visibility to true

    const selected = userListoks.find(
      (listok: ListokInterface) => listok.id === listokId,
    );
    console.log('Selected Listok:', selected);
    if (selected) {
      Alert.alert(
        'Change selected Listok?',
        'You will lose changes such as items checked on this listok when you change',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Change List');
              setValue(selectedListok); // Reset the value back to the previous one
              setIsAlertVisible(false); // Set alert visibility to false
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.log('Changed Listok');
              dispatch(setSelectedListok(listokId));
              setValue(listokId); // Update the value to the new selected one
              setIsAlertVisible(false); // Set alert visibility to false
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
      <View style={theme.container}>
        <TouchableOpacity
          style={theme.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}>
          <Text>
            {value
              ? items.find(item => item.value === value)?.label
              : 'Select a Listok'}
          </Text>
        </TouchableOpacity>

        {showDropdown && (
          <View
            style={[theme.dropdownListContainer, theme.dropdownListPosition]}>
            <FlatList
              data={items}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={theme.dropdownItem}
                  onPress={() => {
                    setShowDropdown(false);
                    handleSelect(item.value);
                  }}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
      zIndex: 1000, // Ensure this container is above others
      position: 'relative',
    },
    dropdown: {
      borderColor: '#000',
      padding: 10,
      color: '#000',
      backgroundColor: '#fff',
      borderRadius: 4,
      borderWidth: 1,
    },
    dropdownListContainer: {
      borderColor: '#000',
      backgroundColor: '#fff',
      borderRadius: 4,
      borderWidth: 1,
      maxHeight: 150,
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      right: 0,
    },
    dropdownListPosition: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
    },
    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  });

export default ListokDropdownSelector;
