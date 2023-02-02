import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackNavigationProp = {
  Intro: undefined;
  Home: undefined;
  Settings: undefined;
  Scanner: { teamId: string; eventId: string };
};

export type NavigationPropType = NativeStackNavigationProp<RootStackNavigationProp>;

export enum TabAlias {
  Home = 'Home',
  Settings = 'Settings',
}
