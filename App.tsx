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
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import {
  FlatList,
  Pressable,
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useHandleHyperlink } from './src/shared';
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
  const { handlePress } = useHandleHyperlink(webUrl);

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
}

function DetailsScreen({ route }) {
  const { project } = route.params;
  const { handlePress } = useHandleHyperlink(project?.webUrl);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.header}>name: {project?.name}</Text>
      <Text style={styles.header}>description: {project?.description}</Text>
      <Text style={styles.header} onPress={handlePress}>
        {project?.webUrl}
      </Text>
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
