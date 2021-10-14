import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, Pressable, View, Text } from 'react-native';
import { Input, Button } from 'native-base';
import { PROJECTS_QUERY } from '../services/gitlab.api';
import {
  useHandleHyperlink,
  ProjectsProps,
  Screen,
  Project,
  styles,
} from '../shared';

const ProjectItem = ({
  project,
  onPress,
}: {
  project: Project;
  onPress: () => void;
}) => {
  const { name, description, webUrl } = project;
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

export default function ProjectsScreen({ navigation }: ProjectsProps) {
  const [search, setSearch] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, error, data } = useQuery(PROJECTS_QUERY, {
    variables: { search },
  });

  if (error) {
    // return Error! ${error}`;
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <View>
      <Input
        mx="3"
        m="3"
        placeholder="mongodb"
        isFullWidth={true}
        value={searchValue}
        onChangeText={setSearchValue}
        InputRightElement={
          <Button
            roundedLeft="0"
            isLoading={loading}
            isLoadingText="Loading"
            onPress={() => setSearch(searchValue)}>
            Search
          </Button>
        }
      />

      {data && data.projects && data.projects.nodes && (
        <FlatList
          data={data.projects.nodes}
          renderItem={({ item }) => (
            <ProjectItem
              project={item}
              onPress={() =>
                navigation.navigate(Screen.PROJECT, { project: item })
              }
            />
          )}
          keyExtractor={project => project.id.toString()}
        />
      )}
    </View>
  );
}
