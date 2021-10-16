# react-native-graphql-starter

##  Getting Started 

This project is not using Expo but rather the React Native CLI so follow [these instructions](https://reactnative.dev/docs/environment-setup). Steps below are taken from there.

**Note: This project was built and tested on a mac with an iOS 15.0 iPhone13 simulator but the components are cross platforms so should work with the android simulator as well. The react navigator library was setup to work with android as well.**

```shell
# install packages
yarn 

# install pods for ios via cocoapods
npx pod-install ios

# start metro bundler
npx react-native start

# assuming you have ios setup start the simulator
npx react-native run-ios
```

## Dependencies

[React Navigation](https://reactnavigation.org/doc) - screen navigation

[Native Base](https://docs.nativebase.io/) - UI

[React Content Loader](https://skeletonreact.com/) - for skeleton loading