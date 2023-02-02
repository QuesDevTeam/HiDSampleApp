import { Platform, Alert, Linking } from 'react-native';
import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import { request, PERMISSIONS } from 'react-native-permissions';
import CameraRoll from '@react-native-community/cameraroll';
import { t } from 'i18next';

const galleryPermission =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    : PERMISSIONS.IOS.PHOTO_LIBRARY;

async function hasPermission() {
  try {
    const status = await request(galleryPermission);

    if (status === 'granted' || status === 'limited') {
      return true;
    }

    throw new Error();
  } catch (error) {
    Alert.alert(t('home.permission.storage.title'), t('home.permission.storage.message'), [
      { text: t('home.permission.storage.negativeButton'), style: 'cancel' },
      {
        text: t('home.permission.storage.positiveButton'),
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]);

    throw new Error('permissionAlert');
  }
}

export const saveImageToGallery = (image: string, fileName: string) => {
  hasPermission()
    .then(() => {
      if (Platform.OS === 'android') {
        const base64Image = image.split(',')[1];
        return writeFile(`${DownloadDirectoryPath}/${fileName}`, base64Image, 'base64');
      }
    })
    .then(() => {
      const saveTarget =
        Platform.OS === 'android' ? `file://${DownloadDirectoryPath}/${fileName}` : image;
      return CameraRoll.save(saveTarget);
    })
    .then(() => {
      Alert.alert(t('home.card.message.success'));
    })
    .catch((error) => {
      if (error.message === 'permissionAlert') {
        return;
      }

      Alert.alert(t('home.card.message.failure'));
    });
};
