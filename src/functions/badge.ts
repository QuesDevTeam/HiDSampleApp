import AsyncStorage from '@react-native-async-storage/async-storage';

export const countBadgeNumber = async (ids: string[]) => {
  const readIds = (await AsyncStorage.getItem('ids')) || `[]`;
  const parsedReadIds = JSON.parse(readIds) as string[];

  const badgeNumber = ids.slice().filter((id) => !parsedReadIds.includes(id)).length;
  return badgeNumber;
};

export const saveNotificationIds = async (ids: string[]) => {
  return AsyncStorage.setItem('ids', JSON.stringify(ids));
};
