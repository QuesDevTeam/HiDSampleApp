import React from 'react';
import { StyleSheet, View } from 'react-native';

import WebView from 'components/WebView';

function Home() {
  return (
    <View style={styles.container}>
      <WebView tab='home' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default Home;
