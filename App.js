import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import CanvasEditorScreen from './Components/Canvas/Canvas';
import MyProjectsPage from './Components/MyProjectsPage';
import TextElementScreen from './Components/TextElement/TextElement';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CanvasEditorScreen"
          component={CanvasEditorScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="MyProjects" component={MyProjectsPage} />
        <Stack.Screen
          name="TextElementScreen"
          component={TextElementScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
