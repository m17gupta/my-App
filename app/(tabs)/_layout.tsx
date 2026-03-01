import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { RootState } from '@/redux/store';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22E1FF', // Vibrant Blue
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBackground: 'transparent',
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          height: 80,
          paddingBottom: 25,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
        }}
      />
      {user?.role === 'admin' && <Tabs.Screen
        name="allUser"
        options={{
          title: 'All User',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="message.fill" color={color} />,
        }}
      />}
      <Tabs.Screen
        name="documents"
        options={{
          title: 'Vault',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="lock.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
