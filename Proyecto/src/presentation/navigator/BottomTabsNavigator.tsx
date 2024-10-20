import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashBoard } from '../screens/DashBoard';
import { FollowScreen } from '../screens/FollowScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { IonIcon } from '../components/shared/IonIcon';
import { MaterialIcon } from '../components/shared/MaterialIcon';
import { DetailsScreen } from '../screens/DetailsScreen';
import { PurchaseOrdersScreen } from '../screens/PurchaseOrdersScreen';


const Tab = createBottomTabNavigator();

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
        component={FollowScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="label-important" />
          ), tabBarAccessibilityLabel: 'Seguimiento'
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
}