import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { Colors } from 'styles';

function SyncProgressView({ isInProgress }: { isInProgress: boolean }) {
  return (
    <View style={styles.container}>
      {isInProgress ? (
        <Progress.Circle style={styles.chartStyle} indeterminate size={120} color='white' />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  chartStyle: {
    position: 'absolute',
    bottom: '55%',
  },
});

export default SyncProgressView;
