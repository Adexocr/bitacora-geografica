import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6C5CE7' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Capturar',
          tabBarIcon: ({ color, size }) => <Ionicons name="camera" color={color} size={size} />,
        }}
        />
      <Tabs.Screen
        name="galeria"
        options={{
          title: 'Galería',
          tabBarIcon: ({ color, size }) => <Ionicons name="images" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
