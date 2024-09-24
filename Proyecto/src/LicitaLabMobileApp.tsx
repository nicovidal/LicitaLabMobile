import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { BottomTabNavigator } from './presentation/navigator/BottomTabsNavigator';



export const LicitaLabMobileApp = () => {
  return (
    <NavigationContainer>
        {/* <StackNavigator/> */}
        <BottomTabNavigator/>
    </NavigationContainer>
  )
}
