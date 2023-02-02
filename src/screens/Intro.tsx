import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { playIntro, setStatusBarIntroStyle } from 'reducers/navigation';

import TextLogoIcon from 'resources/icons/intro/text_logo.png';

import { Colors } from 'styles';

const SPLASH_SCREEN_DURATION = 3000;

function Intro() {
  const dispatch = useDispatch();
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(setStatusBarIntroStyle());
    const timer = setTimeout(() => dispatch(playIntro()), SPLASH_SCREEN_DURATION);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(SPLASH_SCREEN_DURATION / 3),
      Animated.timing(animationValue, {
        toValue: 1,
        duration: SPLASH_SCREEN_DURATION / 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={TextLogoIcon}
        resizeMode='contain'
        style={[
          styles.logoStyle,
          {
            opacity: animationValue,
          },
        ]}
      />
    </View>
  );
}

const imageSize = {
  textLogo: {
    width: 134,
    height: 72,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  logoStyle: {
    position: 'absolute',
    bottom: '55%',
    ...imageSize.textLogo,
  },
});

export default Intro;
