import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { DetailsScreen } from '../screens/DetailsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ItemScreen } from '../screens/ItemScreen';

export type RootStackParams = {
  Login: undefined;
  BottomTabNavigator: undefined;
  Details: { code: string; type: string };
  Search: undefined;
  ItemList: { itemsText?: string; code: string; type: string };
};

const Stack = createStackNavigator<RootStackParams>();

interface Props {
  isAuthenticated: boolean; 
}

export const StackNavigator = ({ isAuthenticated }: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Si no está autenticado, muestra solo la pantalla de Login */}
      {!isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
      ) : (
        <>
          {/* Si está autenticado, muestra las demás pantallas */}
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
          />
          {/* Agrega más pantallas según sea necesario */}
        </>
      )}
    </Stack.Navigator>
  );
};
