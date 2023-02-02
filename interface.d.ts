declare module '*.png' {
  const value: any;
  export = value;
}

declare module 'react-native-restart' {
  const module: { Restart: () => void };
  export default module;
}
