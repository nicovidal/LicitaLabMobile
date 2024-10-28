import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashBoard } from '../screens/DashBoard';
import { FollowScreen } from '../screens/FollowScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { IonIcon } from '../components/shared/IonIcon';
import { MaterialIcon } from '../components/shared/MaterialIcon';
import { DetailsScreen } from '../screens/DetailsScreen';
import { PurchaseOrdersScreen } from '../screens/PurchaseOrdersScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { ItemScreen } from '../screens/ItemScreen';
import { SearchScreen } from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FollowStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ItemList"
        component={ItemScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="dashboard" />
          ),
        }}
      />
      <Tab.Screen
        name="Seguimiento"
        component={FollowStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="label-important" />
          ),
        }}
      />
      <Tab.Screen
        name="Ordenes de compras"
        component={PurchaseOrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="file-tray-full-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="person" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
