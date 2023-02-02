import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import CodePush from 'react-native-code-push';

import Navigator from 'Navigator';
import SyncProgressView from 'screens/SyncProgressView';
import StatusBar from 'components/navigation/StatusBar';

import store from 'store';

import useCodePush from 'hooks/useCodePush';

import { Colors } from 'styles';

function App() {
  const [isInit, isUpdating] = useCodePush();

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      PushNotification.localNotification({
        title: remoteMessage.notification?.title || '',
        message: remoteMessage.notification?.body || '',
        smallIcon: 'notification_icon',
        playSound: true,
        soundName: 'default',
      });
    });

    return () => unsubscribe();
  }, []);

  const { hasPlayedIntro } = store.getState().navigation;

  return (
    <Provider store={store}>
      {!isInit || isUpdating ? (
        <SyncProgressView isInProgress={isUpdating} />
      ) : (
        <SafeAreaProvider style={!hasPlayedIntro ? { backgroundColor: Colors.primary } : {}}>
          <StatusBar />
          <Navigator />
        </SafeAreaProvider>
      )}
    </Provider>
  );
}

export default CodePush(App);
