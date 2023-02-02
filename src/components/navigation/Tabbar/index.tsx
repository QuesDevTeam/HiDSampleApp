import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import { useAppDispatch } from 'store';

import { setNeedActionFloatingButton } from 'reducers/common';

import CardIcon from 'resources/icons/navigation/card.png';
import HomeIcon from 'resources/icons/navigation/home.png';
import ProfileIcon from 'resources/icons/navigation/profile.png';

function Tabbar({ state, descriptors, navigation }: BottomTabBarProps) {
  const dispatch = useAppDispatch();

  let optionStyle: any = {};

  state.routes.forEach((route) => {
    if (route.name === 'UserCard') {
      return;
    }

    const { options } = descriptors[route.key];

    // @ts-ignore
    if (options?.tabBarStyle?.display === 'none') {
      optionStyle = options?.tabBarStyle;
    }
  });

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // @ts-ignore
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        if (route.name === 'UserCard') {
          return <React.Fragment key='UserCard' />;
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={[styles.buttonContainer, { ...optionStyle }]}
            onPress={onPress}
          >
            <Image
              style={[
                styles.iconStyle,
                isFocused ? styles.activeIconStyle : styles.inactiveIconStyle,
              ]}
              source={route.name === 'Home' ? HomeIcon : ProfileIcon}
              resizeMode='contain'
            ></Image>
          </TouchableOpacity>
        );
      })}

      <LinearGradient
        colors={['#969696', '#252525']}
        useAngle
        angle={135}
        style={[styles.floatingButtonContainerStyle, { ...optionStyle }]}
      >
        <TouchableOpacity
          style={styles.floatingButtonStyle}
          onPress={() => dispatch(setNeedActionFloatingButton())}
        >
          <Image style={styles.iconStyle} source={CardIcon}></Image>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  activeIconStyle: {
    tintColor: '#252525',
  },
  inactiveIconStyle: {
    tintColor: '#D7D7D7',
  },
  floatingButtonContainerStyle: {
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 27.5,
    left: '50%',
    transform: [{ translateX: -27.5 }],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252525',
    borderRadius: 27.5,
  },
  floatingButtonStyle: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tabbar;
