import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, View } from 'react-native';
import { Input, Button, Pressable, Text, Box, Flex } from 'native-base';
import { PROJECTS_QUERY } from '../services/gitlab.api';
import {
  useHandleHyperlink,
  ProjectsProps,
  Screen,
  Project,
  IGitlabProjectsResponse,
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
    <Pressable onPress={onPress}>
      <Box p="5" m={3} rounded="8" bg="cyan.700">
        <Text color="cyan.50" mt="3" fontWeight="medium" fontSize={20}>
          {name}
        </Text>
        <Text mt="2" fontSize={14} color="cyan.100">
          {description}
        </Text>
        <Flex>
          <Text
            mt="2"
            fontSize={12}
            fontWeight="medium"
            color="cyan.400"
            onPress={handlePress}>
            {webUrl}
          </Text>
        </Flex>
      </Box>
    </Pressable>
  );
};

export default function ProjectsScreen({ navigation }: ProjectsProps) {
  const [search, setSearch] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, error, data } = useQuery<
    IGitlabProjectsResponse,
    { search: string }
  >(PROJECTS_QUERY, {
    variables: { search },
  });

  if (error) {
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
