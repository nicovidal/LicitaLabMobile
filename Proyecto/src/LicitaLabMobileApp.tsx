import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { BottomTabNavigator } from './presentation/navigator/BottomTabsNavigator';
import { PaperProvider } from 'react-native-paper';



export const LicitaLabMobileApp = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator />
    {/* <BottomTabNavigator /> */}
      </NavigationContainer>
    </PaperProvider>
  )
}
