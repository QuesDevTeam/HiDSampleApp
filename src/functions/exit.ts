import { Alert, BackHandler } from 'react-native';
import { t } from 'i18next';

export const requestExitApp = () => {
  Alert.alert(t('home.exitAlert.title'), '', [
    {
      text: t('home.exitAlert.positiveButton'),
      onPress: () => BackHandler.exitApp(),
    },
    { text: t('home.exitAlert.negativeButton'), style: 'cancel' },
  ]);
};
