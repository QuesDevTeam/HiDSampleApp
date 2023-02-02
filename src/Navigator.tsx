import React from 'react';
import { View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Tabbar from 'components/navigation/Tabbar';

import Intro from 'screens/Intro';
import Home from 'screens/Home';
import Settings from 'screens/Settings';
import Scanner from 'screens/Scanner';

import { getBackgroundStyleByAlias } from 'functions/wrapper';

import { RootState } from 'store';

import { Colors, Container } from 'styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootStackNavigator() {
  const { hasPlayedIntro, aliasForWrapper } = useSelector(
    (state: RootState) => ({
      hasPlayedIntro: state.navigation.hasPlayedIntro,
      aliasForWrapper: state.navigation.aliasForWrapper,
    }),
    shallowEqual,
  );

  const backgroundStyle = getBackgroundStyleByAlias(aliasForWrapper);

  return (
    <NavigationContainer>
      <SafeAreaView style={[Container.appContainer, backgroundStyle]} edges={['bottom']}>
        <Stack.Navigator
          screenOptions={{
            header: () => null,
            contentStyle: { padding: 0, margin: 0 },
            orientation: 'portrait',
            gestureEnabled: false,
          }}
        >
          {!hasPlayedIntro ? (
            <Stack.Screen
              name='Intro'
              component={Intro}
              options={{
                animationTypeForReplace: 'push',
                gestureEnabled: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name='MainTab'
                component={MainTabNavigator}
                options={{ orientation: 'portrait', gestureEnabled: false }}
              />
              <Stack.Screen
                name='Scanner'
                component={Scanner}
                options={{ orientation: 'portrait', gestureEnabled: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='MainStack'
      tabBar={(props) => <Tabbar {...props} />}
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.yellow,
        tabBarInactiveTintColor: Colors.grey,
        header: () => null,
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerTitleAlign: 'center',
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name='UserCard'
        component={View}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen name='Settings' component={Settings} options={{ headerTitleAlign: 'center' }} />
    </Tab.Navigator>
  );
}

export default RootStackNavigator;
