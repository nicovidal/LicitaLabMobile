import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper'; // Usar react-native-paper
import { useFollowStore } from '../../store/follow/useFollowStore';
import { useNavigation } from '@react-navigation/native'; // Para navegar entre pantallas
import { RootStackParams } from '../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const FollowScreen = ({navigation}:Props) => {
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
    <View>
      <Text>Followed Opportunities:</Text>
      {opportunities.map((opportunity) => (
        <View key={opportunity.id} style={{ marginVertical: 10 }}>
          <Text>Code: {opportunity.code}</Text>
          <Text>Name: {opportunity.name}</Text>
          <Text>Type: {opportunity.type}</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Details', { code: opportunity.code })} 
          >
            Ver Detalles
          </Button>
        </View>
      ))}
    </View>
  );
};
