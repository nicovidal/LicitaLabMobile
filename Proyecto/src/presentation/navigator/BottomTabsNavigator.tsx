import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/LoginScreen';
import { DashBoard } from '../screens/DashBoard';
import { FollowScreen } from '../screens/FollowScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { IonIcon } from '../components/shared/IonIcon';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

      }}
    >
      <Tab.Screen name="DashBoard" component={DashBoard} />
      <Tab.Screen name="FollowScreen" component={FollowScreen} />
      <Tab.Screen 
        name="AccountScreen" 
        component={AccountScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="person"/>
          ),
        }} 
      />
    </Tab.Navigator>
  );
}