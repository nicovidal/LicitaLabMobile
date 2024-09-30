import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';
import { FollowScreen } from '../screens/FollowScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { BottomNavigation } from 'react-native-paper';
import { BottomTabNavigator } from './BottomTabsNavigator';


export type RootStackParams = {
  Login: undefined;
  BottomTabNavigator:undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,

      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
{/*       <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="FollowScreen" component={FollowScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} /> */}
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} /> 



    </Stack.Navigator>
  );
}