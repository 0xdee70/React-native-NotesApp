import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {Appbar, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const TextElementScreen = ({route}) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const {savedText, editIndex} = route.params || {
    savedText: '',
    editIndex: null,
  };

  useEffect(() => {
    if (editIndex !== null) {
      setText(savedText);
    }
  }, [editIndex, savedText]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    if (text.trim() !== '') {
      Alert.alert(
        'Are you sure you want to delete this text?',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              setText('');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSave = () => {
    navigation.navigate('CanvasEditorScreen', {savedText: text});
  };

  return (
    <>
      <Appbar style={styles.appbar}>
        <IconButton
          icon={require('../../assets/cancel.png')}
          onPress={handleCancel}
        />
        <IconButton
          icon={require('../../assets/delete.png')}
          onPress={handleDelete}
        />
        <IconButton
          icon={require('../../assets/check.png')}
          onPress={handleSave}
        />
      </Appbar>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter text..."
          value={text}
          onChangeText={newText => setText(newText)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TextElementScreen;
