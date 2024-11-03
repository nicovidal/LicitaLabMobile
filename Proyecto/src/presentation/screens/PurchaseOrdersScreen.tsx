import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { ActivityIndicator, Badge, Card, Text, Title } from 'react-native-paper';
import { usePurchaseOrderStore } from '../../store/purchaseOrder/usePurchaseOrderStore';
import { MaterialIcon } from "../components/shared/MaterialIcon";
import { LoaderScreen } from '../components/LoaderScreen';

export const PurchaseOrdersScreen = () => {
  const { purchaseOrder, fetchPurchaseOrder,loading } = usePurchaseOrderStore();
  const [searchText, setSearchText] = useState("");
  const [filteredPurchaseOrder, setFilteredPurchaseOrder] = useState(purchaseOrder);


  useEffect(() => {
    fetchPurchaseOrder(); // Llama a la función para obtener los datos
  }, []);

  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };


  useEffect(() => {
    const debouncer = setTimeout(() => {
      const normalizedSearchText = normalizeText(searchText.toLowerCase());
      
      const filtered = purchaseOrder.filter(purchaseOrder => {
        const normalizedPurchaseOrderName = normalizeText(purchaseOrder.name.toLowerCase());
        const normalizedPurchaseOrderCode = normalizeText(purchaseOrder.code.toLowerCase());
        
        return normalizedPurchaseOrderName.includes(normalizedSearchText) || 
        normalizedPurchaseOrderCode.includes(normalizedSearchText);
      });

      setFilteredPurchaseOrder(filtered);
    }, 300); 
    return () => clearTimeout(debouncer);
  }, [searchText, purchaseOrder]);

  
  if (loading && purchaseOrder.length === 0) {
    return < LoaderScreen  />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por ID o palabra clave"
          autoFocus
          autoCorrect={false}
          value={searchText}
          onChangeText={setSearchText}
        />
        <MaterialIcon name="search" size={24} color="gray" />
      </View>
      <FlatList
        data={filteredPurchaseOrder}
        keyExtractor={(purchaseOrder) => purchaseOrder.code}
        numColumns={1}
        renderItem={({ item: purchaseOrder }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>{purchaseOrder.code}</Title>
              <Title style={styles.cardTitle}>{purchaseOrder.name}</Title>
              <Title style={styles.cardTitle}>{purchaseOrder.organismName}</Title>
              <Title style={styles.cardTitle}>{purchaseOrder.net_total} {purchaseOrder.currencyType}</Title>
              <Title style={styles.cardTitle}>
                  Fecha de Envio: {formatDate(purchaseOrder.shippingDate)}
                  </Title>
            </Card.Content>
            <View style={styles.badgeContainer}>
              <View style={[styles.enviadaProveedorBadge]}>
                <Text>
                  {purchaseOrder.statusCode}
                </Text>
              </View> 
              <View
                style={[
                  styles.badge,
                  purchaseOrder.reviewStatus === 'PENDING'
                    ? styles.pendingStatus
                    : styles.acceptedStatus
                ]}
                >
                <Text
                  style={[
                    styles.badgeText,
                    purchaseOrder.reviewStatus === 'PENDING'
                      ? styles.acceptedBadgeText
                      : styles.pendingBadgeText
                  ]}
                >
                  {
                    purchaseOrder.reviewStatus === 'PENDING'
                      ? 'Pendiente'
                      : purchaseOrder.reviewStatus === 'ACCEPTED'
                      ? 'Aceptada'
                      : null
                  }
                </Text>
              </View>
            </View>
          </Card>
        )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  card: {
    margin: 6,
    elevation: 2,
    height: 320,
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
    justifyContent: 'center'
  },
  pendingStatus: {
    backgroundColor: '#D3F2DF',
  },
  acceptedStatus: {
    backgroundColor: '#E1E7FF',
  },
  badgeText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  acceptedBadgeText: {
    color: '#048939', 
    fontWeight: 'bold',
  },
  pendingBadgeText: {
    color: '#2F54EB', 
    fontWeight: 'bold',
  },
  enviadaProveedorBadge:{
    backgroundColor: '#E8CBFE',
    justifyContent: 'center',
    marginRight: '2%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    
  }
});
