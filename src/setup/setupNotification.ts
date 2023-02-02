import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

if (Platform.OS === 'android') {
  PushNotification.getChannels((channels) => {
    if (!channels.includes('HI:D')) {
      PushNotification.createChannel(
        {
          channelId: 'HI:D',
          channelName: 'HI:D',
          channelDescription: 'HI:D',
        },
        () => {
          // no-op
        },
      );
    }
  });
}
