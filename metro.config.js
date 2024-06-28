/* eslint-disable no-path-concat */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json'],
    extraNodeModules: {
      '@redux': __dirname + '/redux',
      '@types': __dirname + '/types',
      '@app': __dirname + '/app',
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
