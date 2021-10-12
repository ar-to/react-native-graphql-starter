import { useCallback } from 'react';
import { Linking, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Custom Hook for reusability
 * @param {string} webUrl
 * @returns {Promise<void>}
 */
export const useHandleHyperlink = (webUrl: string) => {
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
  return { handlePress };
};

export enum Screen {
  PROJECTS = 'Projects',
  PROJECT = 'Project',
}

/**
 * Interfaces
 * @see https://reactnavigation.org/docs/typescript/
 */
export interface Project {
  name: string;
  id: string;
  description: string;
  webUrl: string;
  // fullPath: string;
  // createdAt: string;
  // archived: boolean;
  // projectMembers: ProjectMembers;
}

export type RootStackParamList = {
  Projects: undefined;
  Project: { project: Project };
};

export type ProjectsProps = NativeStackScreenProps<
  RootStackParamList,
  Screen.PROJECTS
>;

export type ProjectProps = NativeStackScreenProps<
  RootStackParamList,
  Screen.PROJECT
>;
