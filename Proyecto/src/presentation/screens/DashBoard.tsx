import { useEffect } from 'react';
import { DashBoardCard } from '../components/DashBoardCard';
import { useAuthStore } from '../../store/auth/loginAuthStore';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export const DashBoard = () => {
  const { user } = useAuthStore();
  const { total, agileCount, tenderCount, fetchFollowedOpportunities } = useFollowStore();

  useEffect(() => {
    fetchFollowedOpportunities(true);  // Cargar oportunidades al entrar al dashboard
  }, []);

  const userName = user?.name;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {userName && <Text style={styles.greeting}>¡BUENAS TARDES {userName}!</Text>}

      <View style={styles.cardContainer}>
        <DashBoardCard title="Total en seguimiento" count={total} />
      </View>

      <View style={styles.rowContainer}>
        <DashBoardCard title="Oportunidades Agile" count={agileCount} />
        <DashBoardCard title="Oportunidades Tender" count={tenderCount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Fondo gris claro
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#F9523B', // Color del texto
  },
  greeting: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555', // Color más sutil
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Espacio equitativo entre los cards
    width: '100%',
  },
});
