export default {
  permission: {
    camera: {
      title: '카메라 이용에 대한 엑세스 권한이 없어요',
      message: '앱 설정으로 가서 엑세스 권한을 수정 할 수 있어요',
      negativeButton: '취소',
      positiveButton: '설정하기',
    },
    storage: {
      title: '이미지를 저장하기 위한 권한이 없어요.',
      message: '앱 설정으로 가서 엑세스 권한을 수정 할 수 있어요',
      negativeButton: '취소',
      positiveButton: '설정하기',
    },
  },
  scanner: {
    title: '코드 스캔',
    message: {
      success: '인증되었습니다.',
      failure: '인증에 실패했습니다.',
      alreadySucceed: '이미 처리된 인증입니다.',
    },
  },
  card: {
    message: {
      success: '이미지가 저장되었어요',
      failure: '이미지 저장에 실패했어요.',
    },
  },
  exitAlert: {
    title: '앱을 종료하시겠습니까?',
    positiveButton: '종료',
    negativeButton: '취소',
  },
};
