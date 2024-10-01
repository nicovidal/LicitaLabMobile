import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Importar componentes de react-native-paper
import { useFollowStore } from '../../store/follow/useFollowStore';
import { useNavigation } from '@react-navigation/native'; // Para navegar entre pantallas
import { RootStackParams } from '../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const FollowScreen = ({ navigation }: Props) => {
  const { opportunities, loading, error, fetchFollowedOpportunities } = useFollowStore();

  useEffect(() => {
    fetchFollowedOpportunities(true);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Oportunidades en Seguimiento</Text>
      {opportunities.map((opportunity) => (
        <Card 
          key={opportunity.id} 
          style={styles.card}
          onPress={() => navigation.navigate('Details', { code: opportunity.code })} // Navegar al detalle al hacer clic
        >
          <Card.Content>
            <Title>{opportunity.name}</Title>
            <Paragraph>Code: {opportunity.code}</Paragraph>
            <Paragraph>Type: {opportunity.type}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Color de fondo claro
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#fff', // Color de fondo de la tarjeta
    elevation: 2, // Sombra para la tarjeta
  },
});
