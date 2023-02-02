export default {
  permission: {
    camera: {
      title: 'You have no permission to use camera.',
      message: 'You can go to app settings to modify the access permission.',
      negativeButton: 'cancel',
      positiveButton: 'continue',
    },
    storage: {
      title: 'You have no permission to save the image.',
      message: 'You can go to app settings to modify the access permission.',
      negativeButton: 'cancel',
      positiveButton: 'continue',
    },
  },
  scanner: {
    title: 'Code Scan',
    message: {
      success: 'Scan successful',
      failure: 'Scan failed',
      alreadySucceed: 'Already scanned.',
    },
  },
  card: {
    message: {
      success: 'Successfully saved',
      failure: 'Save failed',
    },
  },
  exitAlert: {
    title: 'Do you want to exit?',
    positiveButton: 'exit',
    negativeButton: 'cancel',
  },
};
