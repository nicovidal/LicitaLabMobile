import { useEffect } from 'react';
import { DashBoardCard } from '../components/DashBoardCard';
import { useAuthStore } from '../../store/auth/loginAuthStore';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { Text } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get('window');

export const DashBoard = () => {
  const { user } = useAuthStore();
  const { total, agileCount, tenderCount, fetchFollowedOpportunities } = useFollowStore();

  useEffect(() => {
    fetchFollowedOpportunities(true);  // Cargar oportunidades al entrar al dashboard
  }, []);

  const userName = user?.name;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DashBoard</Text>
      {userName && <Text style={styles.greeting}>¡Buenas tardes, {userName}!</Text>}

      <View style={styles.cardContainer}>
        <DashBoardCard title="Total seguimiento" count={total} />
      </View>

      <View style={styles.rowContainer}>
        <DashBoardCard title="Licitaciones" count={tenderCount} style={styles.card} />
        <DashBoardCard title="Compras Agiles" count={agileCount} style={styles.card} />
      </View>


      <View style={styles.rowContainer}>
        <DashBoardCard title="Convenio Marco" count={0} style={styles.card} />
        <DashBoardCard title="Cotizaciones" count={0} style={styles.card} />
      </View>


      <View style={styles.cardContainer}>
        <DashBoardCard title="Oportunidades que cierran esta semana" count={0} style={styles.lastCard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6, 
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left', 
    color: '#333',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10, 
    color: '#555',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 10,
    width: '100%',
  },
  card: {
    width: width * 0.28, 
    marginHorizontal: 5, 
  },
  lastCard: {
    width: '90%', 
    marginBottom: 5,
  },
});
