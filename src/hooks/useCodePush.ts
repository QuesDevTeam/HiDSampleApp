import { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';

const useCodePush = () => {
  const [isInit, setInit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkAndGetCodePush = async () => {
      try {
        const update = await CodePush.checkForUpdate();
        setInit(true);

        if (update && update?.isMandatory) {
          setIsUpdating(true);
          update.download().then((newPackage) => {
            newPackage.install(CodePush.InstallMode.IMMEDIATE, 1000).then(() => {
              CodePush.restartApp();
            });
          });

          return;
        }

        setInit(true);
      } catch (err) {
        setIsUpdating(false);
        setInit(true);
      }
    };

    checkAndGetCodePush();
  }, []);

  return [isInit, isUpdating];
};

export default useCodePush;
