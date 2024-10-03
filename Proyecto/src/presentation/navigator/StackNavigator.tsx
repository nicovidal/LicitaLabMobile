import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';
import { FollowScreen } from '../screens/FollowScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { BottomNavigation } from 'react-native-paper';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { DetailsScreen } from '../screens/DetailsScreen';




export type RootStackParams = {
  Login: undefined;
  BottomTabNavigator:undefined;
  Loader: undefined; // Agrega el Loader a los tipos
  Details:{code:string};
  Follow:undefined;

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
  {/* <Stack.Screen name="DashBoard" component={DashBoard} /> */}
       {/*  <Stack.Screen name="Follow" component={FollowScreen} /> */}
{/*   <Stack.Screen name="AccountScreen" component={AccountScreen} />  */}
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} /> 
      <Stack.Screen name="Details" component={DetailsScreen} /> 



    </Stack.Navigator>
  );
}