import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import WebView from 'components/WebView';

function Settings() {
  const [disabled, setDisabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setDisabled(true);

        setTimeout(() => {
          setDisabled(false);
        }, 500);
      };
    }, []),
  );

  return <View style={styles.container}>{disabled ? <></> : <WebView tab='settings' />}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default Settings;
