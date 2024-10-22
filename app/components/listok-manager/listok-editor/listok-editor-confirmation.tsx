/* eslint-disable react-native/no-inline-styles */
import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import { ThemeType } from '@app/constants/themes';
import { listokManagerApis } from '@app/utils/api-connections/listok-manager-api';
import { capitaliseWord } from '@app/utils/capitaliseWord';
import { useNavigation } from '@react-navigation/native';
import { changeListokStep, DaysOfWeek } from '@redux/slices/listokEditorSlice';
import { getRecipeByID } from '@redux/slices/recipeManagerSlice';
import { RootState } from '@redux/store';
import { ListokNavigationProp } from '@typed/navigation';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ListokEditorConfirmation = () => {
  const listok = useSelector((state: RootState) => state.listokEditor);
  const { userRecipes } = useSelector((state: RootState) => state.recipeManager)
  console.log('USER RECIPES IN LISTOK CONFIRMATION ::', userRecipes)
  const theme = useTheme(styles)
  const { userId, name, token } = useSelector(
    (state: RootState) => state.user.user,
  );
  console.log('LISTOK IN CONFIRMATION ::', listok.listokData)
  
  const dispatch = useDispatch();
  const navigation = useNavigation<ListokNavigationProp>();

  const handleBackPress = () => dispatch(changeListokStep(2));

  const handleConfirmPress = async () => {
    if (listok.existingListok) {
      console.log('Existing listok Submit Triggered: ', listok.listokData);
      try {
        await listokManagerApis.updateExistingListok(
          JSON.stringify(listok.listokData),
          token,
        );
        navigation.navigate('Your Listoks');
      } catch (error) {
        console.log('Error submitting changes: ', error);
      }
    } else {
      try {
        console.log('listokSubmitted: ', listok.listokData);
        await listokManagerApis.postNewListok(
          JSON.stringify({
            ...listok.listokData,
            createdBy: userId,
            createdByName: name,
          }),
          token,
        );
        navigation.navigate('Your Listoks');
      } catch (error) {
        console.error('Error submitting listok:', error);
      }
    }
  };

  return (
    <View style={theme.container}>
      <Text style={theme.title}>{listok.listokData.title}</Text>
      <Text style={theme.desc}>{listok.listokData.desc}</Text>
      <View style={theme.daysContainer}>
        {Object.keys(listok.listokData.days).map((day: string) => (
          <View key={day} style={theme.dayContainer}>
            <Text style={theme.dayTitle}>{capitaliseWord(day)}</Text>
            {listok.listokData.days[day as DaysOfWeek].map((recipeID: string) => {
              const recipe = getRecipeByID(recipeID)
              return recipe && (
                <View key={recipeID}>
                  <Text style={{...theme.text, paddingLeft: 5}}>{recipe.title}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>

      <View style={theme.buttonWrapper}>
        <ListokButton
          text="Back"
          onPress={handleBackPress}
          propStyles={{ width: '45%', borderRadius: 5 }}
        />
        <ListokButton
          text="Confirm and Save"
          onPress={handleConfirmPress}
          propStyles={{ width: '45%', borderRadius: 5 }}
        />
      </View>

    </View>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.surface,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginTop: 'auto',
    margin: 10,
  },
  text: {
    color: theme.surfaceText
  },
  title: {
    color: theme.surfaceText,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 25
  },
  desc: {
    color: theme.surfaceText,
    fontSize: 15,
    alignSelf: 'center'
  },
  daysContainer: {
    marginTop: 10
  },
  dayContainer: {
    margin: 5,
    alignItems: 'center'
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.surfaceText
  }
});

export default ListokEditorConfirmation;
