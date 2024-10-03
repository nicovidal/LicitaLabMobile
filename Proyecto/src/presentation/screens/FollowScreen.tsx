import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Menu, Button, Text } from 'react-native-paper';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { RootStackParams } from '../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { IonIcon } from '../components/shared/IonIcon';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const FollowScreen = ({ navigation }: Props) => {
  const { visibleOpportunities, loading, error, fetchFollowedOpportunities, loadMoreOpportunities } = useFollowStore();

  const [numColumns, setNumColumns] = useState(2);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false); // Nuevo estado para manejar el filtrado

  useEffect(() => {
    fetchFollowedOpportunities();
  }, []);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const filterByType = (type: string) => {
    setIsFiltering(true); // Activar el spinner de carga
    setSelectedType(type);
    closeMenu();
    setIsFiltering(false); // Desactivar el spinner después de filtrar
  };

  const clearFilter = () => {
    setIsFiltering(true); // Activar el spinner de carga
    setSelectedType(null);
    closeMenu();
    setIsFiltering(false); // Desactivar el spinner después de filtrar
  };

  const filteredOpportunities = visibleOpportunities.filter(opportunity => {
    const matchesType = selectedType ? opportunity.type === selectedType.toLowerCase() : true;
    return matchesType;
  });

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
      <View style={styles.headerContainer}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <IonIcon name="filter" size={24} color="#000" />
            </TouchableOpacity>
          }
        >
          <Menu.Item title="Tipo" onPress={() => {}} disabled />
          <Menu.Item onPress={clearFilter} title="Todas" />
          <Menu.Item onPress={() => filterByType('tender')} title="Licitaciones" />
          <Menu.Item onPress={() => filterByType('agile')} title="Compra Ágil" />
          <Menu.Item onPress={() => filterByType('quote')} title="Cotizaciones" />
        </Menu>

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
          onPress={() => navigation.navigate('Search')}
        >
          Buscar
        </Button>
      </View>

      {isFiltering && <ActivityIndicator size="large" color="#0000ff" />} 

      <FlatList
        data={filteredOpportunities} 
        keyExtractor={(opportunity) => opportunity.id.toString()}
        numColumns={numColumns}
        key={`flatlist-${numColumns}`}
        renderItem={({ item: opportunity }) => {
          return (
            <View style={{ flex: 1, margin: 5 }}>
              <Card
                style={[styles.card, {
                  backgroundColor:
                    opportunity.type === 'agile'
                      ? '#8054FF'
                      : opportunity.type === 'tender'
                      ? '#F9523B'
                      : '#3663f8',
                }]}
                onPress={() => navigation.navigate('Details', { code: opportunity.code })}
              >
                <Card.Content>
                  <Title style={styles.cardTitle}>{opportunity.code}</Title>
                  <Title style={styles.cardTitle}>{truncateText(opportunity.name, 20)}</Title>
                  <Title style={styles.cardTitle}>Cierre:</Title>
                  <Title style={styles.cardTitle}>
                    {new Date(opportunity.closing_date).toLocaleDateString()}
                  </Title>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  changeRowButton: {
    marginRight: 10,
    backgroundColor: '#8054FF',
    marginLeft: 40,
    borderRadius: 6,
  },
  buttonBuscar: {
    backgroundColor: '#8054FF',
    paddingHorizontal: 20,
    borderRadius: 6,
  },
});
