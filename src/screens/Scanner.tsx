import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Vibration,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';

import Navbar from 'components/navigation/Navbar';
import Toast from 'components/common/Toast';

import { useAppSelector } from 'store';

import { useCameraPermission } from 'hooks/useCameraPermission';

import { checkin } from 'functions/checkin';

import { NavigationPropType, RootStackNavigationProp } from 'types/navigation';

import FlipCameraIcon from 'resources/icons/navigation/flip_camera.png';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackNavigationProp, 'Scanner'>;

function Scanner({ route }: Props) {
  const toastRef = useRef<{
    showAlert: (status: 'success' | 'failure', message: string) => void;
  }>();
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const accessToken = useAppSelector((state) => state.auth.token);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationPropType>();
  const { eventId } = route.params;

  const permission = useCameraPermission();

  useEffect(() => {
    if (permission && permission !== 'granted') {
      Alert.alert(t('home.permission.camera.title'), t('home.permission.camera.message'), [
        {
          text: t('home.permission.camera.negativeButton'),
          style: 'cancel',
          onPress: () => navigation.pop(),
        },
        {
          text: t('home.permission.camera.positiveButton'),
          onPress: () => {
            Linking.openSettings();
            navigation.pop();
          },
        },
      ]);
    }
  }, [permission]);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        title={t('home.scanner.title')}
        onLeftButtonPress={() => navigation.pop()}
        rightIcon={FlipCameraIcon}
        onRightButtonPress={() => {
          if (cameraType === 'back') {
            setCameraType('front');
          } else {
            setCameraType('back');
          }
        }}
      />

      <View style={styles.innerContainer}>
        <QRCodeScanner
          containerStyle={scannerStyles.containerStyle}
          topViewStyle={scannerStyles.topViewStyle}
          bottomViewStyle={scannerStyles.bottomViewStyle}
          reactivate
          cameraStyle={{
            flex: 1,
            width,
            overflow: 'hidden',
            height: Platform.OS === 'android' ? '100%' : height - 56 - insets.top - insets.bottom,
          }}
          onRead={(e) => {
            const token = /token=([^&]*)/.exec(e.data)?.[1] || '';
            checkin(accessToken, eventId, token)
              .then(() => {
                toastRef.current?.showAlert('success', t('home.scanner.message.success'));
              })
              .catch((error) => {
                toastRef.current?.showAlert('failure', error.message);
              })
              .finally(() => {
                Vibration.vibrate();
              });
          }}
          reactivateTimeout={3000}
          cameraType={cameraType}
          showMarker
          markerStyle={scannerStyles.markerStyle}
        />
      </View>
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
});

const scannerStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  topViewStyle: { flex: 0, height: 0 },
  bottomViewStyle: { flex: 0, height: 0 },
  markerStyle: {
    borderColor: 'white',
    borderStyle: 'dashed',
  },
});

export default Scanner;
