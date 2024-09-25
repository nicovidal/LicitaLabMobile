import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const DashBoardCard = () => {
  return (
    <Card style={{width:'60%'}}>
    <Card.Content>
      <Text variant="titleLarge" style={{textAlign:'center'}}>75</Text>
      <Text variant="bodyMedium" style={{textAlign:'center'}}>Total en seguimiento</Text>
    </Card.Content>
  </Card>
  
  )
}

const styles=StyleSheet.create({


})