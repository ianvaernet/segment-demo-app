import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MarketScreen from '../screens/MarketScreen';
import { BottomTabParamList, SignUpParamList, SignInParamList, ProfileParamList, MarketParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator initialRouteName="SignIn" tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="SignUp"
        component={SignUpNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-add" color={color} />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="SignIn"
        component={SignInNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="enter" color={color} />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-circle" color={color} />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
          unmountOnBlur: true,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SignUpStack = createStackNavigator<SignUpParamList>();

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerTitle: 'Sign up' }} />
    </SignUpStack.Navigator>
  );
}
const SignInStack = createStackNavigator<SignInParamList>();

function SignInNavigator() {
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerTitle: 'Sign in' }} />
    </SignInStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerTitle: 'Profile' }} />
    </ProfileStack.Navigator>
  );
}

const MarketStack = createStackNavigator<MarketParamList>();

function MarketNavigator() {
  return (
    <MarketStack.Navigator>
      <MarketStack.Screen name="MarketScreen" component={MarketScreen} options={{ headerTitle: 'Market' }} />
    </MarketStack.Navigator>
  );
}
