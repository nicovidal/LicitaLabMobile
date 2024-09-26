import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';


export type RootStackParams = {
  Login: undefined;
  DashBoard: undefined;

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
      <Stack.Screen name="DashBoard" component={DashBoard} />



    </Stack.Navigator>
  );
}