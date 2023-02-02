import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

import { API_HOST } from 'constant/host';

export const registerMessagingToken = async (accessToken: string) => {
  try {
    if (!accessToken) {
      return;
    }

    const messagingToken = await messaging().getToken();

    axios({
      method: 'PUT',
      url: `${API_HOST}/api/user/messaging-token`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        messagingToken,
      },
    });
  } catch {
    // no-op
  }
};
