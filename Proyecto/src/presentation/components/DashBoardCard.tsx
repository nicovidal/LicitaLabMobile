import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface DashBoardCardProps {
  title: string;
  count: number;
}

export const DashBoardCard = ({ title, count }: DashBoardCardProps) => {
  return (
    <Card style={{ width: '60%' }}>
      <Card.Content>
        <Text variant="titleLarge" style={{ textAlign: 'center' }}>{count}</Text>
        <Text variant="bodyMedium" style={{ textAlign: 'center' }}>{title}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({});
