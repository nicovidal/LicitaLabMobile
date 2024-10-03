import React, { useEffect, useState } from 'react'; // Importar useState
import { DashBoardCard } from '../components/DashBoardCard';
import { useAuthStore } from '../../store/auth/loginAuthStore';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'Login'> {}

export const DashBoard = ({ navigation }: Props) => {
  const { user, logout } = useAuthStore();
  const { total, agileCount, tenderCount, fetchFollowedOpportunities } = useFollowStore();
  
  const [isLoading, setIsLoading] = useState(true); // Definir isLoading

  useEffect(() => {
    const loadOpportunities = async () => {
      setIsLoading(true); // Iniciar la carga
      await fetchFollowedOpportunities(true);
      setIsLoading(false); // Terminar la carga
    };

    loadOpportunities(); 
  }, []);

  const userName = user?.name;

  const handleLogout = async () => {
    await logout(); 
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DashBoard</Text>
        <Button
          style={styles.logoutButton}
          mode="outlined"
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
      {userName && <Text style={styles.greeting}>¡Buenas tardes, {userName}!</Text>}

      <View style={styles.cardContainer}>
        <DashBoardCard title="Total seguimiento" count={total} loading={isLoading} />
      </View>

      <View style={styles.rowContainer}>
        <DashBoardCard title="Licitaciones" count={tenderCount} loading={isLoading} />
        <DashBoardCard title="Compras Agiles" count={agileCount} loading={isLoading} />
      </View>

      <View style={styles.rowContainer}>
        <DashBoardCard title="Convenio Marco" count={0} loading={isLoading} />
        <DashBoardCard title="Cotizaciones" count={0} loading={isLoading} />
      </View>

      <View style={styles.cardContainer}>
        <DashBoardCard title="Oportunidades que cierran esta semana" count={0} loading={isLoading} />
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
  header: {
    flexDirection: 'row', // Alinea los elementos en fila
    justifyContent: 'space-between', // Espacia los elementos
    alignItems: 'center', // Centra verticalmente
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  logoutButton: {
    marginLeft: 10, // Añade espacio entre el título y el botón
  },
});
