import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useAuthStore } from './store/auth/loginAuthStore';  
import { NotificationProvider } from './notifications/NotificationContext';

export const LicitaLabMobileApp = () => {
  const { checkStatus, status } = useAuthStore(); 

  useEffect(() => {
    const initializeAuth = async () => {
      await checkStatus();  
    };

    initializeAuth();
  }, [checkStatus]);

  return (
    <NotificationProvider>
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <StackNavigator  />
      </NavigationContainer>
    </PaperProvider>
    </NotificationProvider>
  );
};  