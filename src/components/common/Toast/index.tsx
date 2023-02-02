import React, { useState } from 'react';
import { Text, Dimensions, StyleSheet, Animated } from 'react-native';

const { height } = Dimensions.get('window');

function clearTimer(timer: NodeJS.Timeout) {
  try {
    clearTimeout(timer);
  } catch {}
}

// TODO: Fix type.
function Toast(_: any, ref: any) {
  const [type, setType] = useState<'success' | 'failure'>('success');
  const [text, setText] = useState('');

  let timer: NodeJS.Timeout;
  const [opacity, __] = useState(new Animated.Value(0));

  React.useImperativeHandle(ref, () => ({
    showAlert: (type: 'success' | 'failure', message: string) => {
      setType(type);
      setText(message);
      clearTimer(timer);
      Animated.timing(opacity, {
        delay: 50,
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setText('');
        });
      }, 1000);
    },
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity },
        type === 'success' && styles.successStyle,
        type === 'failure' && styles.failureStyle,
      ]}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,

    position: 'absolute',
    bottom: height / 6,
    left: '50%',
    transform: [{ translateX: -100 }],

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  successStyle: {
    backgroundColor: '#573FF3CC',
  },
  failureStyle: {
    backgroundColor: '#000000CC',
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
  },
});

export default React.forwardRef(Toast);
