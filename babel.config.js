module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.json'],
        alias: {
          'actions/*': 'actions/*',
          'apis/*': 'apis/*',
          'components/*': '/components/*',
          'reducers/*': 'reducers/*',
          'scenes/*': 'scenes/*',
          'styles/*': 'styles/*',
          'types/*': 'types/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
