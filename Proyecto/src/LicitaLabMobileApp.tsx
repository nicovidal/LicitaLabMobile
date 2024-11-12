import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ActivityIndicator, DefaultTheme, PaperProvider } from 'react-native-paper';
import { useAuthStore } from './store/auth/loginAuthStore';
import { View } from 'react-native';

export const LicitaLabMobileApp = () => {
  const { checkStatus, status } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkStatus();
      setLoading(false); 
    };

    initializeAuth();
  }, [checkStatus]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
        <PaperProvider theme={DefaultTheme}>
          <StackNavigator isAuthenticated={status === 'authenticated'} />
        </PaperProvider>
    </NavigationContainer>
  );
};

const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
