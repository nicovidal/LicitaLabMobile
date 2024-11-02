import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { Card, Title } from 'react-native-paper';
import { usePurchaseOrderStore } from '../../store/purchaseOrder/usePurchaseOrderStore';
import { MaterialIcon } from "../components/shared/MaterialIcon";

export const PurchaseOrdersScreen = () => {
  const { purchaseOrder, fetchPurchaseOrder } = usePurchaseOrderStore();
  const [searchText, setSearchText] = useState("");
  const [filteredPurchaseOrder, setFilteredPurchaseOrder] = useState(purchaseOrder);


  useEffect(() => {
    fetchPurchaseOrder(); // Llama a la función para obtener los datos
  }, []);

  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const normalizedSearchText = normalizeText(searchText.toLowerCase());
      
      const filtered = purchaseOrder.filter(opportunity => {
        const normalizedOpportunityName = normalizeText(opportunity.name.toLowerCase());
        const normalizedOpportunityCode = normalizeText(opportunity.code.toLowerCase());
        
        return normalizedOpportunityName.includes(normalizedSearchText) || 
               normalizedOpportunityCode.includes(normalizedSearchText);
      });

      setFilteredPurchaseOrder(filtered);
    }, 300); 
    return () => clearTimeout(debouncer);
  }, [searchText, purchaseOrder]);

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
