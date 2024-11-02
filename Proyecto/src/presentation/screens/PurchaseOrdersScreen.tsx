import { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Card, Title } from 'react-native-paper';
import { usePurchaseOrderStore } from '../../store/purchaseOrder/usePurchaseOrderStore';

export const PurchaseOrdersScreen = () => {
  const { purchaseOrder, fetchPurchaseOrder } = usePurchaseOrderStore();

  useEffect(() => {
    fetchPurchaseOrder(); // Llama a la función para obtener los datos
  }, []);

  useEffect(() => {
    console.log("Datos de purchaseOrder (actualizados):", purchaseOrder); // Ahora debería mostrar los datos correctos
  }, [purchaseOrder]); // Se ejecuta cada vez que purchaseOrder cambia

  return (
    <View style={styles.container}>
      <FlatList
        data={purchaseOrder}
        keyExtractor={(purchaseOrder) => purchaseOrder.code}
        numColumns={1}
        renderItem={({ item: purchaseOrder }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>{purchaseOrder.code}</Title>
              <Title style={styles.cardTitle}>{purchaseOrder.name}</Title>
              <Title style={styles.cardTitle}>{purchaseOrder.organismName}</Title>
              <Title style={styles.cardTitle}>{purchaseOrder.net_total} {purchaseOrder.currencyType}</Title>
              <Title style={styles.cardTitle}> Fecha de envio: {purchaseOrder.shippingDate}</Title>
            </Card.Content>
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
  card: {
    margin: 6,
    elevation: 2,
    height: 285,
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
});
