import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { DetailsScreen } from '../screens/DetailsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ItemScreen } from '../screens/ItemScreen';

export type RootStackParams = {
  Login: undefined;
  BottomTabNavigator: undefined;
  Details: { code: string,type:string };
  Search: undefined;
  ItemList: { itemsText?: string; code: string; type:string }

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

      <Stack.Screen name="Details" component={DetailsScreen} options={{
        headerShown: false,
        headerBackTitleVisible: false, 
        title: 'Detalles', 
      }} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ItemList" component={ItemScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
