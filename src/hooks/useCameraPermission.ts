import { useEffect, useState } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

const cameraPermission =
  Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

export const useCameraPermission = () => {
  const [isPermitted, setIsPermitted] = useState<PermissionStatus | ''>('');

  const listener = (event: AppStateStatus) => {
    if (event === 'active') {
      request(cameraPermission).then(setIsPermitted);
    }
  };

  useEffect(() => {
    const subscribe = AppState.addEventListener('change', listener);

    request(cameraPermission).then((result) => {
      setIsPermitted(result);
    });

    return () => subscribe.remove();
  }, []);

  return isPermitted;
};
