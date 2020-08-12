module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          src: './src/',
          screens: './src/screens',
          navigation: './src/navigation',
          components: './src/components',
          constants: './src/constants',
          store: './src/store',
          reducer: './src/reducer',
          saga: './src/saga',
          utils: './src/utils',
          locale: './src/locale',
          'common-components': './src/common-components',
          state: './src/state',
        },
      },
    ],
  ],
}