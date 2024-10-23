import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchListoks } from '@redux/slices/listokManagerSlice';
import { generateShoppingList, setSelectedListok } from '@redux/slices/shoppingManagerSlice';
import { ListokInterface } from '@typed/listok-types';
import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';

const ListokDropdownSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userListoks } = useSelector(
    (state: RootState) => state.listokManager,
  );
  const { selectedListok } = useSelector(
    (state: RootState) => state.shoppingManager,
  );
  const { userId, token } = useSelector((state: RootState) => state.user.user);
  const theme = useTheme(styles);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState<ListokInterface[]>([]);

  useEffect(() => {
    // Fetch listoks on component mount
    dispatch(fetchListoks({ userId, token }));
  }, [dispatch, userId, token]);

  useEffect(() => {
    // Update dropdown items when userListoks changes
    if (userListoks.length > 0) {
      setDropdownItems(userListoks);
    }
  }, [userListoks]);

  const handleSelect = (listokId: string) => {
    const selected = dropdownItems.find((item) => item.id === listokId);
    if (selected) {

      Alert.alert(
        'Change Listok?',
        'This will regenerate your shopping list and you will lose any changes',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => setShowDropdown(false) },
          {
            text: 'Change Listok',
            style: 'default',
            onPress: () => {
              dispatch(setSelectedListok(listokId));
              dispatch(generateShoppingList(listokId))
            },
          },
        ]
      )
    }
    setShowDropdown(false);
  };

  return (
    <View style={theme.container}>
      <TouchableOpacity
        style={theme.dropdownButton}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={theme.dropdownButtonText}>
          {selectedListok
            ? dropdownItems.find((item) => item.id === selectedListok)?.title
            : 'Select a Listok'}
        </Text>
      </TouchableOpacity>

      {/* Modal for dropdown list */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={theme.modalOverlay}
          onPress={() => setShowDropdown(false)}
        >
          <View style={theme.dropdownList}>
            <FlatList
              data={dropdownItems}
              keyExtractor={(item) => item.id as string}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={theme.dropdownItem}
                  onPress={() => handleSelect(item.id as string)}
                >
                  <Text style={theme.dropdownItemText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    dropdownButton: {
      borderWidth: 1,
      borderColor: theme.surface,
      borderRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      padding: 10,
      backgroundColor: theme.highlight,
      justifyContent: 'center',
      alignItems: 'center'
    },
    dropdownButtonText: {
      color: theme.highlightText,
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownList: {
      width: '80%',
      backgroundColor: theme.background,
      borderRadius: 5,
      maxHeight: 200,
      overflow: 'hidden',
    },
    dropdownItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    dropdownItemText: {
      color: theme.backgroundText,
    },
  });

export default ListokDropdownSelector;