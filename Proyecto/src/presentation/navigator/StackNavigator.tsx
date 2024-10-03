import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { DetailsScreen } from '../screens/DetailsScreen';
import { FollowScreen } from '../screens/FollowScreen';

export type RootStackParams = {
  Login: undefined;
  BottomTabNavigator: undefined;
  Details: { code: string };

};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
