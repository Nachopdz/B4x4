// B4X4 v3.2 START
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: { '@': './src' },
      // B4X4 v4.8 HOTFIX START
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      // B4X4 v4.8 HOTFIX END
    }],
    'react-native-reanimated/plugin'
  ]
};
// B4X4 v3.2 END