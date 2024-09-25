import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,

      }}
    >

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DashBoard" component={DashBoard} />



    </Stack.Navigator>
  );
}