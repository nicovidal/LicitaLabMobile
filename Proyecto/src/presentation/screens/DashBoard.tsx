import React, { useEffect, useState } from 'react';
import { DashBoardCard } from '../components/DashBoardCard';
import { useAuthStore } from '../../store/auth/loginAuthStore';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { Text, Button } from 'react-native-paper';
import { View, StyleSheet, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/StackNavigator';
import { closeThisWeek } from '../../actions/closeThisWeek/closeThisWeek';
import notificationService from '../../notifications/NotificationService';

interface Props extends StackScreenProps<RootStackParams, 'Login'> {}

export const DashBoard = ({ navigation }: Props) => {
  const { user, logout } = useAuthStore();
  const { total, agileCount, tenderCount, quotesCount, marcoQuotesCount, fetchFollowedOpportunities } = useFollowStore();
  const [isLoading, setIsLoading] = useState(true);
  const [closingOpportunities, setClosingOpportunities] = useState<number>(0);

  const { width } = Dimensions.get('window');
  const isTablet = width > 768;

  useEffect(() => {
    const loadOpportunities = async () => {
      setIsLoading(true);
      await fetchFollowedOpportunities(true);

      const response = await closeThisWeek();
      const totalClosing = response.agileBuyings + response.tenders; 
      setClosingOpportunities(totalClosing);
      setIsLoading(false);
    };

    loadOpportunities();
  }, []); 
  
  const userName = user?.name;

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };


  const sendTestNotification = () => {
    notificationService.sendNotification("Prueba de Notificación", "Hola Mundo");
    console.log("notificacion")
  };

  return (
    <View style={isTablet ? styles.containerTablet : styles.container}>
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
      {userName && <Text style={styles.greeting}>¡Hola {userName}!</Text>}

      <View style={styles.cardContainer}>
        <DashBoardCard title="Total seguimiento" count={total} loading={isLoading} />
      </View>

      <View style={isTablet ? styles.rowContainerTablet : styles.rowContainer}>
        <DashBoardCard title="Licitaciones" count={tenderCount} loading={isLoading} />
        <DashBoardCard title="Compras Agiles" count={agileCount} loading={isLoading} />
      </View>

      <View style={isTablet ? styles.rowContainerTablet : styles.rowContainer}>
        <DashBoardCard title="Convenio Marco" count={marcoQuotesCount} loading={isLoading} />
        <DashBoardCard title="Cotizaciones" count={quotesCount} loading={isLoading} />
      </View>

      <View style={styles.cardContainer}>
        <DashBoardCard
          title="Oportunidades que cierran esta semana"
          count={closingOpportunities}
          loading={isLoading}
        />
      </View>

      {/* Botón para enviar la notificación de prueba */}
      <Button mode="contained" onPress={sendTestNotification} style={styles.notificationButton}>
        Enviar Notificación de Prueba
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: '#fff',
  },
  containerTablet: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  rowContainerTablet: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 10,
    width: '100%',
  },
  logoutButton: {
    marginLeft: 10,
  },
  notificationButton: {
    marginTop: 20,
  },
});
