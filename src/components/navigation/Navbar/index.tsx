import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';

import Text from 'components/common/Text';

import Colors from 'styles/colors';

import ArrowLeftIcon from 'resources/icons/navigation/arrow_left.png';

type Props = {
  title: string;
  rightIcon: ImageSourcePropType;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
};

function Navbar({ title, rightIcon, onLeftButtonPress, onRightButtonPress }: Props) {
  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.9}
        onPress={() => {
          onLeftButtonPress();
        }}
      >
        <Image style={styles.buttonIconStyle} resizeMode='contain' source={ArrowLeftIcon} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.titleTextStyle}>{title}</Text>
      </View>

      {!!rightIcon && (
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.9}
          onPress={() => {
            onRightButtonPress();
          }}
        >
          <Image style={styles.buttonIconStyle} resizeMode='contain' source={rightIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    color: Colors.primary,
  },
  buttonContainer: {
    width: 24,
    height: 24,
  },
  buttonIconStyle: {
    width: 24,
    height: 24,
  },
});

export default Navbar;
