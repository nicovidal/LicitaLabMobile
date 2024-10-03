import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { DetailsScreen } from '../screens/DetailsScreen';
import { useAuthStore } from '../../store/auth/loginAuthStore';

export type RootStackParams = {
  Login: undefined;
  BottomTabNavigator: undefined;
  Details: { code: string };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const { status } = useAuthStore(); // Obtén el estado de autenticación

  return (
    <Stack.Navigator
      initialRouteName={status === 'authenticated' ? 'BottomTabNavigator' : 'Login'} // Cambia la ruta inicial según el estado
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
