/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import {
  FlatList,
  Pressable,
  Button,
  View,
  Text,
  StyleSheet,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
// import OriginalWelcomeScreen from './src/components/originalWelcome.screen';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://gitlab.com/api/graphql',
  cache: new InMemoryCache(),
});

const PROJECTS_QUERY = gql`
  query GetProjects($search: String, $first: Int = 10) {
    projects(search: $search, first: $first) {
      nodes {
        name
        id
        description
        webUrl
        fullPath
      }
    }
  }
`;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
  },
  subheader: {
    paddingTop: 10,
  },
});

const ChapterItem = ({ chapter, onPress }) => {
  const { name, description, webUrl } = chapter;

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    // const supported = await Linking.canOpenURL(webUrl);
    const supported = await Linking.canOpenURL(webUrl);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(webUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${webUrl}`);
    }
  }, [webUrl]);

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>name: {name}</Text>
      <Text style={styles.header}>description: {description}</Text>
      <Text style={styles.header} onPress={handlePress}>
        {webUrl}
      </Text>
    </Pressable>
  );
};

function HomeScreen({ navigation }) {
  const [search, setSearch] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, error, data } = useQuery(PROJECTS_QUERY, {
    variables: { search },
  });
  // console.log('>>>>', data, '\n search', search);

  if (error) {
    // return Error! ${error}`;
    return <Text>{JSON.stringify(error)}</Text>;
  }

  if (loading) {
    // return <AppLoading />;
    return <Text>Loading</Text>;
  }
  return (
    <View>
      <TextInput
        onChangeText={setSearchValue}
        value={searchValue}
        placeholder="useless placeholder"
        keyboardType="default"
      />
      <Button title="Search" onPress={() => setSearch(searchValue)} />
      <FlatList
        data={data.projects.nodes}
        renderItem={({ item }) => (
          <ChapterItem
            chapter={item}
            onPress={() => navigation.navigate('Project', { project: item })}
          />
        )}
        keyExtractor={chapter => chapter.id.toString()}
      />
    </View>
  );
  // return (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>Home Screen</Text>
  //     <Button
  //       title="Go to Details"
  //       onPress={() =>
  //         navigation.navigate('Details', {
  //           itemId: 86,
  //           otherParam: 'anything you want here',
  //           data: {},
  //         })
  //       }
  //     />
  //   </View>
  // );
}

function DetailsScreen({ route }) {
  // const { itemId, otherParam, data } = route.params;
  const { project } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Project Screen</Text>
      <Text>itemId: {JSON.stringify(project)}</Text>
      {/* <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Text>data: {JSON.stringify(data)}</Text> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Overview' }}
          />
          <Stack.Screen name="Project" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
