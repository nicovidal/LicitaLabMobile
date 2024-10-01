import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useFollowStore } from '../../store/follow/useFollowStore';
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
      <Text style={styles.header}>Oportunidades en seguimiento:</Text>
      {opportunities.map((opportunity) => (
        <Card 
          key={opportunity.id} 
          style={[
            styles.card,
            { backgroundColor: opportunity.type === 'agile' ? '#8054FF' : '#F9523B' } // Colores según tipo
          ]}
          onPress={() => navigation.navigate('Details', { code: opportunity.code })}
        >
          <Card.Content>
            <Title style={styles.cardTitle}>{opportunity.name}</Title>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: {
    color: '#fff', 
  },
});



//UNA AL LADO DE OTRA Previa

/* import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useFollowStore } from '../../store/follow/useFollowStore';
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
      <Text style={styles.header}>Followed Opportunities:</Text>
      <View style={styles.cardContainer}>
        {opportunities.map((opportunity) => (
          <Card 
            key={opportunity.id} 
            style={[
              styles.card,
              { backgroundColor: opportunity.type === 'agile' ? '#8054FF' : '#F9523B' } // Colores según tipo
            ]}
            onPress={() => navigation.navigate('Details', { code: opportunity.code })}
          >
            <Card.Content>
              <Title style={styles.cardTitle}>{opportunity.name}</Title>
              <Paragraph>Code: {opportunity.code}</Paragraph>
              <Paragraph>Type: {opportunity.type}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permitir que las tarjetas se envuelvan
    justifyContent: 'space-between', // Espacio entre tarjetas
  },
  card: {
    width: '48%', // Ajusta el ancho para que quepan dos tarjetas
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: {
    color: '#fff', 
  },
});
 */