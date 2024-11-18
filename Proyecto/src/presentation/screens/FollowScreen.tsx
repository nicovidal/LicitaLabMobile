import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Menu, Button, Text } from 'react-native-paper';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { RootStackParams } from '../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { IonIcon } from '../components/shared/IonIcon';

interface Props extends StackScreenProps<RootStackParams, 'Details'> { }

export const FollowScreen = ({ navigation }: Props) => {
  const { opportunities, loading, error, fetchFollowedOpportunities } = useFollowStore();

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Filtro por estado
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    fetchFollowedOpportunities();
  }, []);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const filterByType = (type: string) => {
    setIsFiltering(true);
    setSelectedType(type);
    closeMenu();
    setIsFiltering(false);
  };

  const filterByStatus = (status: string) => { 
    setIsFiltering(true);
    setSelectedStatus(status);
    closeMenu();
    setIsFiltering(false);
  };

  const clearFilter = () => {
    setIsFiltering(true);
    setSelectedType(null);
    setSelectedStatus(null);  // Limpiar el filtro de estado
    closeMenu();
    setIsFiltering(false);
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesType = selectedType ? opportunity.type === selectedType.toLowerCase() : true;
    const matchesStatus = selectedStatus ? opportunity.status === selectedStatus : true;  
    return matchesType && matchesStatus;
  });

  if (loading && opportunities.length === 0) {
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
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'cerrada':
        return [styles.closedBadge, styles.closedBadge];
      case 'publicada':
        return [styles.closedBadge, styles.publishedBadge];
      case 'desierta':
        return [styles.closedBadge, styles.desertBadge];
      case 'oc emitida':
        return [styles.closedBadge, styles.ocBadge];
      default:
        return styles.closedBadge;
    }
  };

  const getStatusTextStyle = (status: string) => {
    return status.toLowerCase() === 'publicada' ? styles.publishedText : styles.closedBadgeText;
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
          <Menu.Item title="Tipo" onPress={() => { }} disabled />
          <Menu.Item onPress={clearFilter} title="Todas" />
          <Menu.Item onPress={() => filterByType('tender')} title="Licitaciones" />
          <Menu.Item onPress={() => filterByType('agile')} title="Compra Ágil" />
          <Menu.Item onPress={() => filterByType('quote')} title="Cotizaciones" />
          <Menu.Item onPress={() => filterByType('marco_quote')} title="Convenio marco" />
          <Menu.Item title="Estado" onPress={() => { }} disabled />
          <Menu.Item onPress={() => filterByStatus('Cerrada')} title="Cerrada" />
          <Menu.Item onPress={() => filterByStatus('Publicada')} title="Publicada" />
          <Menu.Item onPress={() => filterByStatus('Desierta')} title="Desierta" />
          <Menu.Item onPress={() => filterByStatus('OC Emitida')} title="OC Emitida" />
          <Menu.Item onPress={() => filterByStatus('Adjudicada')} title="Adjudicada" />
        </Menu>
        <Button
          style={styles.buttonBuscar}
          mode="contained"
          onPress={() => {navigation.navigate('Search')}}
        >
          Buscar
        </Button>

      </View>

      {isFiltering && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={filteredOpportunities}
        keyExtractor={(opportunity) => opportunity.id.toString()}
        numColumns={1}
        renderItem={({ item: opportunity }) => {
          return (
            <View style={{ flex: 1, margin: 5 }}>
              <Card
                style={styles.card}
                onPress={() => navigation.navigate('Details', { code: opportunity.code, type: opportunity.type })}
              >
                <Card.Content>
                  <Title style={styles.cardTitle}>{opportunity.code}</Title>
                  <Title style={styles.cardTitle}>{truncateText(opportunity.name, 30)}</Title>
                  <Title style={styles.cardTitle}>{truncateText(opportunity.organism, 30)}</Title>
                  <Title style={styles.cardTitle}>Monto ofertado: ${opportunity.applied_amount}</Title>
                  <Title style={styles.cardTitle}>
                    Cierre: {new Date(opportunity.closing_date).toLocaleDateString()}
                  </Title>
                </Card.Content>
                <View style={styles.badgeContainer}>
                  <View style={[
                    styles.badge,
                    opportunity.type === 'agile'
                      ? styles.agileBadge
                      : opportunity.type === 'tender'
                        ? styles.tenderBadge
                        : opportunity.type === 'marco_quote'
                          ? styles.marcoQuoteBadge
                          : styles.quoteBadge
                  ]}>
                    <Text style={styles.badgeText}>
                      {opportunity.type === 'agile' ? 'Ágil' : opportunity.type === 'tender' ? 'Licitación' : opportunity.type === 'marco_quote' ? 'C.Marco' : 'Cotización'}
                    </Text>
                  </View>
                  <View style={getStatusBadgeStyle(opportunity.status)}>
                    <Text style={getStatusTextStyle(opportunity.status)}>
                      {opportunity.status}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          );
        }}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 6,
    elevation: 2,
    height: 220,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  cardTitle: {
    color: '#000',
    fontSize: 16, 
    maxWidth: '100%',
    flexShrink: 1,
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
  buttonBuscar: {
    backgroundColor: '#8054FF',
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  agileBadge: {
    backgroundColor: '#8054FF',
  },
  tenderBadge: {
    backgroundColor: '#F9523B',
  },
  quoteBadge: {
    backgroundColor: '#3498db',
  },
  marcoQuoteBadge: {
    backgroundColor: '#008507',
  },
  publishedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  badgeText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  closedBadge: {
    backgroundColor: '#FFDFDF', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  closedBadgeText: {
    color: '#EE0000',
    fontWeight: 'bold',
  },
  publishedBadge: {
    backgroundColor: '#D3F2DF', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  publishedBadgeText: {
    color: 'green', 
    fontWeight: 'bold',
  },
  desertBadge: {
    backgroundColor: '#EEEEEE', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  desertBadgeText: {
    color: '#7A7A7A', 
    fontWeight: 'bold',
  },
  ocBadge: {
    backgroundColor: '#E1E7FF', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  ocBadgeText: {
    color: '#0033CC', 
    fontWeight: 'bold',
  },
});

export default FollowScreen;
