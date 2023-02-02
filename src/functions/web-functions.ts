import { Alert, Linking, Share } from 'react-native';

import { AppDispatch } from 'store';

import { setLogin, setNeedLogout } from 'reducers/auth';
import { setStatusBarLightStyle, setStatusBarDefaultStyle } from 'reducers/navigation';
import { setBadgeNumber } from 'reducers/badge';

import { requestExitApp } from 'functions/exit';
import { saveImageToGallery } from 'functions/file';
import { registerMessagingToken } from 'functions/messaging';
import { countBadgeNumber, saveNotificationIds } from 'functions/badge';
import { setLocale } from 'functions/locale';

import { NavigationPropType } from 'types/navigation';
import { setNeedToRefreshForLanguage } from 'reducers/language';

type Action =
  | 'navigation'
  | 'auth'
  | 'share'
  | 'logout'
  | 'tab'
  | 'image'
  | 'statusbar'
  | 'exit'
  | 'scanner'
  | 'notification'
  | 'readNotification'
  | 'language'
  | 'externalLink';

type NavigationParams = { screen: string };
type AuthParams = { token: string };
type ShareParams = { title: string; url: string };
type TabParams = { disabled: boolean };
type ImageParams = { image: string; fileName: string };
type StatusbarParams = { variant: 'light' | 'default' };
type ScannerParams = { params: { teamId: string; eventId: string } };
type NotificationParams = { ids: [] };
type LanguageParams = { language: string };
type LinkParams = { url: string };

type Params =
  | NavigationParams
  | AuthParams
  | ShareParams
  | TabParams
  | ImageParams
  | StatusbarParams
  | ScannerParams
  | NotificationParams
  | LanguageParams
  | {};

type Data = {
  action: Action;
  params: Params;
};

export const handlePostMessage = async (
  tab: 'auth' | 'home' | 'userCard' | 'settings',
  message: string,
  dispatch: AppDispatch,
  navigation: NavigationPropType,
) => {
  try {
    const { action, params } = JSON.parse(message) as Data;

    if (tab === 'settings') {
      if (action === 'auth' || action === 'tab') {
        return;
      }
    }

    switch (action) {
      case 'statusbar':
        const statusbarParams = params as StatusbarParams;

        if (statusbarParams.variant === 'light') {
          dispatch(setStatusBarLightStyle());
        } else {
          dispatch(setStatusBarDefaultStyle());
        }
        break;

      case 'navigation':
        const navigationParams = params as NavigationParams;

        if (navigationParams.screen === 'Settings') {
          navigation.navigate(navigationParams.screen);
        }

        if (navigationParams.screen === 'Home') {
          navigation.navigate(navigationParams.screen);
        }
        break;

      case 'auth':
        const authParams = params as AuthParams;
        if (authParams.token) {
          dispatch(setLogin({ token: authParams.token }));
          registerMessagingToken(authParams.token);
        }
        break;

      case 'exit':
        requestExitApp();
        break;

      case 'logout':
        dispatch(setNeedLogout());
        navigation.navigate('Home');
        break;

      case 'share':
        const shareParams = params as ShareParams;
        Share.share({
          title: shareParams.title,
          message: shareParams.url,
          url: shareParams.url,
        });
        break;

      case 'tab':
        const tabParams = params as TabParams;
        if (tabParams.disabled) {
          // @ts-ignore
          navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
          // @ts-ignore
          navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
        break;

      case 'image':
        const imageParams = params as ImageParams;
        saveImageToGallery(imageParams.image, imageParams.fileName);
        break;

      case 'scanner':
        const scannerParams = params as ScannerParams;
        navigation.navigate('Scanner', scannerParams.params);
        break;

      case 'language':
        const languageParams = params as LanguageParams;
        await setLocale(languageParams.language);

        let targetTab = '';
        if (tab === 'home') {
          targetTab = 'settings';
        } else if (tab === 'settings') {
          targetTab = 'home';
        }

        dispatch(setNeedToRefreshForLanguage({ tab: targetTab }));
        break;

      case 'externalLink':
        const linkParams = params as LinkParams;
        Linking.openURL(linkParams.url);
        break;

      default:
        break;
    }

    if (action === 'notification' || action === 'readNotification') {
      const notificationParams = params as NotificationParams;

      if (action === 'readNotification') {
        await saveNotificationIds(notificationParams.ids);
      }

      const badgeNumber = await countBadgeNumber(notificationParams.ids);
      dispatch(setBadgeNumber(badgeNumber));
    }
  } catch {
    // no-op
  }
};
