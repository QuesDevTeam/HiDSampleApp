import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Linking, BackHandler } from 'react-native';
import RNWebView, { WebView as WebviewType } from 'react-native-webview';
import SendIntentAndroid from 'react-native-send-intent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import { useAppDispatch, useAppSelector } from 'store';

import { resetLogin } from 'reducers/auth';
import { resetNeedActionFloatingButton } from 'reducers/common';
import { setBadgeNumber } from 'reducers/badge';
import { resetNeedToRefreshForLanguage } from 'reducers/language';

import { handlePostMessage } from 'functions/web-functions';

import { WEBVIEW_HOST } from 'constant/host';

import { NavigationPropType } from 'types/navigation';

function WebView({ tab }: { tab: 'home' | 'userCard' | 'settings' }) {
  const navigation = useNavigation<NavigationPropType>();

  let initialUrl = '';
  switch (tab) {
    case 'home':
      initialUrl = `${WEBVIEW_HOST}/app`;
      break;
    case 'userCard':
      initialUrl = `${WEBVIEW_HOST}/app/card/user`;
      break;
    case 'settings':
      initialUrl = `${WEBVIEW_HOST}/app/settings`;
      break;
    default:
      break;
  }

  const [url, setUrl] = useState(initialUrl);
  const [canGoBack, setCanGoBack] = useState(false);
  const [init, setInit] = useState(false);
  const webview = useRef<WebviewType>(null);

  const dispatch = useAppDispatch();
  const {
    token,
    needLogout,
    needActionFloatingButton,
    badgeNumber,
    targetTab,
    needToRefreshForLanguage,
  } = useAppSelector((state) => ({
    token: state.auth.token,
    needLogout: state.auth.needLogout,
    needActionFloatingButton: state.common.needActionFloatingButton,
    badgeNumber: state.badge.number,
    targetTab: state.language.targetTab,
    needToRefreshForLanguage: state.language.needToRefreshForLanguage,
  }));

  const onShouldStartLoadWithRequest = (event: any) => {
    if (event.canGoBack) {
      setCanGoBack(true);
    } else {
      setCanGoBack(false);
    }

    if (
      event.url.startsWith('http://') ||
      event.url.startsWith('https://') ||
      event.url.startsWith('about:blank')
    ) {
      return true;
    }

    if (Platform.OS === 'android') {
      SendIntentAndroid.openChromeIntent(event.url)
        .then((isOpened) => {
          if (!isOpened) {
            let fallbackUrl = /(browser_fallback_url=)(.*?)(;)/gi.exec(event.url)?.[0] ?? '';
            fallbackUrl = fallbackUrl.split('browser_fallback_url=')[1];
            fallbackUrl = fallbackUrl.split(';')[0];
            fallbackUrl = decodeURIComponent(fallbackUrl);
            setUrl(fallbackUrl);
          }
        })
        .catch(() => {
          // no-op
        });

      return false;
    } else {
      Linking.openURL(event.url);
      return false;
    }
  };

  useEffect(() => {
    if (needActionFloatingButton) {
      if (tab === 'settings') {
        navigation.navigate('Home');
        return;
      }

      // TODO: Fix it. Why it needs setTimeout.
      setTimeout(() => {
        webview.current?.injectJavaScript(`window.pushUrl("/app/card/user")`);
        dispatch(resetNeedActionFloatingButton());
      }, 0);
    }
  }, [needActionFloatingButton]);

  useEffect(() => {
    if (needLogout) {
      webview.current?.injectJavaScript(`localStorage.removeItem('token');`);
      webview.current?.reload();
      dispatch(resetLogin());
    }
  }, [needLogout]);

  useEffect(() => {
    if (init) {
      webview.current?.reload();
    } else {
      setInit(true);
    }
  }, [token]);

  useEffect(() => {
    if (init) {
      // TODO: Fix it. Why it needs setTimeout.
      setTimeout(() => {
        webview.current?.injectJavaScript(`window.setBadgeNumber(${badgeNumber});`);
      }, 1000);
    }
  }, [init, badgeNumber]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(() => {
      dispatch(setBadgeNumber(badgeNumber + 1));
    });

    return () => unsubscribe();
  }, [badgeNumber]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        webview.current?.injectJavaScript(`
          if (location.pathname === '/app/settings') {
            const message = JSON.stringify({ action: "navigation", params: { screen: "Home" } })
            window.ReactNativeWebView.postMessage(message);
          } else if (location.pathname !== '/app') {
            history.go(-1);
          } else {
            const message = JSON.stringify({ action: "exit" });
            window.ReactNativeWebView.postMessage(message);
          }
        `);

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [canGoBack]),
  );

  useFocusEffect(() => {
    if (targetTab === tab && needToRefreshForLanguage) {
      webview.current?.reload();
      dispatch(resetNeedToRefreshForLanguage());
    }
  });

  return (
    <RNWebView
      pullToRefreshEnabled
      ref={webview}
      source={{ uri: url }}
      allowsBackForwardNavigationGestures
      applicationNameForUserAgent='HI:D'
      renderToHardwareTextureAndroid
      thirdPartyCookiesEnabled
      javaScriptEnabled
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      setSupportMultipleWindows={false}
      onError={console.log}
      cacheEnabled={false}
      originWhitelist={[
        'https://*',
        'http://*',
        'file://*',
        'sms://*',
        'tel://*',
        'mailto://*',
        'intent:*',
      ]}
      overScrollMode='never'
      bounces={false}
      onContentProcessDidTerminate={() => webview?.current?.reload()}
      injectedJavaScript={`
          const viewPortMeta = document.createElement('meta');
          viewPortMeta.setAttribute('name', 'viewport');
          viewPortMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, height=device-height, user-scalable=no, viewport-fit=cover, target-densitydpi=device-dpi');
          document.head.appendChild(viewPortMeta);

          var compatibleMeta = document.createElement('meta');
          compatibleMeta.setAttribute('httpEquiv', 'X-UA-Compatible');
          compatibleMeta.setAttribute('content', 'IE=edge');
          document.head.appendChild(compatibleMeta);

          var sheet = document.createElement('style')
          sheet.innerHTML = '*{-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-tap-highlight-color:rgba(255,255,255,0);}input{-webkit-user-select: auto;-moz-user-select: auto;-ms-user-select: auto;user-select: auto;-webkit-tap-highlight-color:rgba(255,255,255,0);}body{width: 100vw;}';
          document.head.appendChild(sheet);
        `}
      onMessage={(event) => {
        handlePostMessage(tab, event.nativeEvent.data, dispatch, navigation);
      }}
    />
  );
}

export default WebView;
