import React from 'react';
import {
  Text,
  Box,
  HStack,
  Spacer,
  Flex,
  Center,
  ScrollView,
} from 'native-base';
import { format } from 'date-fns';
import { useHandleHyperlink, ProjectProps } from '../shared';

export default function ProjectScreen({ route }: ProjectProps) {
  const { project } = route.params;
  const { name, description, webUrl, archived, createdAt } = project;
  const { handlePress } = useHandleHyperlink(webUrl);

  return (
    <Center mt={3} mb={3} px="3">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box p="5" rounded="8" bg="cyan.700">
          <HStack alignItems="flex-start">
            <Text fontSize={12} color="cyan.50" fontWeight="medium">
              {format(new Date(createdAt), 'yyyy/mm/dd')}
            </Text>
            <Spacer />
            <Text fontSize={10} color="cyan.100">
              {archived ? 'archived' : 'not archived'}
            </Text>
          </HStack>
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
          <Box>
            <HStack alignItems="flex-start">
              <Text fontSize={20} color="cyan.50" fontWeight="medium">
                Members
              </Text>
              <Spacer />
              <Text fontSize={20} color="cyan.100">
                #: {project?.projectMembers?.nodes.length}
              </Text>
            </HStack>
            {project?.projectMembers.nodes.map(({ id, user }) => (
              <Box key={id}>
                <Text color="cyan.50" mt="3" fontWeight="medium" fontSize={14}>
                  {user?.name}
                </Text>
                <Text
                  mt="2"
                  fontSize={12}
                  fontWeight="medium"
                  color="cyan.400"
                  onPress={handlePress}>
                  {user?.webUrl}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </Center>
  );
}
