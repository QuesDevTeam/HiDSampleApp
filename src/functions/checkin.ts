import axios from 'axios';
import { t } from 'i18next';

import { API_HOST } from 'constant/host';

export const checkin = async (accessToken: string, eventId: string, qrCode: string) => {
  if (!accessToken || !qrCode || !eventId) {
    throw new Error(t('home.scanner.message.failure'));
  }

  return axios
    .request<{ message: 'ok' }>({
      method: 'POST',
      url: `${API_HOST}/api/group/event/${eventId}/record`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        qrCode,
      },
    })
    .then(({ data }) => {
      if (data.message !== 'ok') {
        throw new Error(t('home.scanner.message.failure'));
      }
    })
    .catch((error) => {
      if (error?.response?.data?.detailedStatusCode === 'EVENT-000') {
        throw new Error(t('home.scanner.message.alreadySucceed'));
      }

      throw new Error(t('home.scanner.message.failure'));
    });
};
