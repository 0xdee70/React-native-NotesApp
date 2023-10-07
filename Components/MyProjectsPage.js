// import { useEffect, useState } from 'react';
// import { Image, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Text } from 'react-native-paper';

// const MyProjectsPage = () => {
//   const [imageURI, setImageURI] = useState('');

//   useEffect(() => {
    
//     const loadImageURI = async () => {
//       try {
//         const uri = await AsyncStorage.getItem('savedCanvases');
//         setImageURI(uri || ''); // Set the state with the retrieved URI
//       } catch (error) {
//         console.error('Error retrieving image URI:', error);
//       }
//     };

//     loadImageURI();
//   }, []);

//   if (!imageURI) {
//     // Handle the case where the image URI is empty
//     return (
//       <View>
//         <Text>No saved canvas image found.</Text>
//       </View>
//     );
//   }

//   return (
//     <Image
//       style={{ width: 200, height: 200 }}
//       source={{ uri: imageURI }}
//     />
//   );
// };

// export default MyProjectsPage;


import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MyProjectsPage = () => {
  const [imageURIs, setImageURIs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Retrieve all saved image URIs from local storage
    const loadCanvasImages = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const imageKeys = keys.filter((key) => key.startsWith('canvasImage'));
        const imageURIs = await AsyncStorage.multiGet(imageKeys);
        setImageURIs(imageURIs.map(([, uri]) => uri));
      } catch (error) {
        console.error('Error retrieving image URIs:', error);
      }
    };

    loadCanvasImages();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageURIs.length === 0 ? (
        <Text>No saved canvases found.</Text>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {imageURIs.map((uri, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('CanvasEditorScreen', { savedText: '' })}
            >
              <Image
                style={{ width: 100, height: 100, margin: 10 }}
                source={{ uri }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MyProjectsPage;
