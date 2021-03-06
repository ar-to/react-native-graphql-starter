/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/services/gitlab.api';
import { RootStackParamList, Screen } from './src/shared';
import ProjectsScreen from './src/components/projects.screen';
import ProjectScreen from './src/components/project.screen';
import OriginalWelcomeScreen from './src/components/originalWelcome.screen';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Screen.PROJECTS}>
            <Stack.Screen
              name={Screen.ORIGINAL}
              component={OriginalWelcomeScreen}
            />
            <Stack.Screen name={Screen.PROJECTS} component={ProjectsScreen} />
            <Stack.Screen name={Screen.PROJECT} component={ProjectScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
};

export default App;
