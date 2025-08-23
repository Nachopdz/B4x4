const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Excluir el directorio problemático de Firebase
config.resolver.blockList = [
  /node_modules\/firebase\/firestore\/dist\/ai/,
];

module.exports = config;
