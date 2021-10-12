import { useCallback } from 'react';
import { Linking, Alert } from 'react-native';

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
