import { ColorValue } from 'react-native';

import { Colors } from 'styles';

export const getBackgroundStyleByAlias = (alias: string) => {
  const style: { backgroundColor: ColorValue } = { backgroundColor: Colors.white };

  switch (alias) {
    case 'intro':
      style.backgroundColor = Colors.primary;
      break;
    case 'light':
      style.backgroundColor = Colors.light;
      break;
    default:
      style.backgroundColor = Colors.white;
      break;
  }

  return style;
};
