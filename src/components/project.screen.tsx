import React from 'react';
import { View, Text } from 'react-native';
import { useHandleHyperlink, ProjectProps, styles } from '../shared';

export default function ProjectScreen({ route }: ProjectProps) {
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
