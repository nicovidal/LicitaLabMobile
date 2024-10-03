import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { RootStackParams } from '../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'Details'> { }

export const FollowScreen = ({ navigation }: Props) => {
  const { visibleOpportunities, loading, error, fetchFollowedOpportunities, loadMoreOpportunities } = useFollowStore();

  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    fetchFollowedOpportunities();
  }, []);

  if (loading && visibleOpportunities.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const truncateText = (text: string, maxLength: number) => {
    if (numColumns === 2 && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Button
          style={styles.changeRowButton}
          onPress={() => setNumColumns(numColumns === 2 ? 1 : 2)} 
          labelStyle={{ color: '#ffffff' }} 
        >
          Cambiar fila
        </Button>
        <Button
          style={styles.buttonBuscar}
          mode="contained"
          onPress={() => console.log("Buscar button pressed")} 
        >
          Buscar
        </Button>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonLicitacion}
          mode="contained"
          onPress={() => console.log("Licitacion button pressed")} 
        >
          Licitaciones
        </Button>
        <Button
          style={styles.buttonAgil}
          mode="contained"
          onPress={() => console.log("Agil button pressed")} 
        >
          Agiles
        </Button>
      </View>

      <FlatList
        data={visibleOpportunities}
        keyExtractor={(opportunity) => opportunity.id.toString()}
        numColumns={numColumns}
        key={`flatlist-${numColumns}`}
        renderItem={({ item: opportunity }) => {
          return (
            <View style={{ flex: 1, margin: 5 }}>
              <Card
                style={[
                  styles.card,
                  { backgroundColor: opportunity.type === 'agile' ? '#8054FF' : opportunity.type === 'tender' ? '#F9523B' : '#3663f8' }
                ]}
                onPress={() => navigation.navigate('Details', { code: opportunity.code })}
              >
                <Card.Content>
                  <Title style={styles.cardTitle}>{opportunity.code}</Title>
                  <Title style={styles.cardTitle}>{truncateText(opportunity.name, 20)}</Title>
                  <Title style={styles.cardTitle}>Cierre:</Title>
                  <Title style={styles.cardTitle}> {new Date(opportunity.closing_date).toLocaleDateString()}</Title>
                </Card.Content>
              </Card>
            </View>
          );
        }}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreOpportunities}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 1,
    elevation: 2,
    height: 220,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  cardTitle: {
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  changeRowButton: {
    marginRight: 10,
    backgroundColor: '#8054FF',
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonLicitacion: {
    marginRight: 10,
    backgroundColor: '#F9523B',
    flex: 1,
    borderRadius: 6,
  },
  buttonAgil: {
    marginLeft: 10,
    backgroundColor: '#8054FF',
    flex: 1,
    borderRadius: 6,
  },
  buttonBuscar: {
    backgroundColor: '#8054FF',
    paddingHorizontal: 20,
    borderRadius: 6,
  },
});
