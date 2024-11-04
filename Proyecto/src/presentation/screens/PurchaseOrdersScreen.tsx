import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { Badge, Card, Text, Title } from 'react-native-paper';
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

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const getStatusBadgeStyle = (statusCode: number) => {
    switch (statusCode) {
      case 4: // Código para 'enviada a proveedor'
        return [styles.enviadaProveedorBadge];
      case 5: // Código para 'en proceso'
        return [styles.enProcesoBadge];
      case 6: // Código para 'aceptada'
        return [styles.aceptadaBadge];
      case 9: // Código para 'cancelada'
        return [styles.canceladaBadge];
      case 12: // Código para 'recepcion conforme'
        return [styles.recepcionConformeBadge];
      case 13: // Código para 'pendiente de recepcionar'
        return [styles.pendienteRecepcionarBadge];
      case 14: // Código para 'recepcionada parcialmente'
        return [styles.recepcionadaParcialmenteBadge];
      case 15: // Código para 'recepcion conforme incompleta'
        return [styles.recepcionConformeIncompletaBadge];
      default:
        return [styles.default];
    }
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
              <Title style={styles.cardTitle}>Monto Neto: ${purchaseOrder.net_total} {purchaseOrder.currencyType}</Title>
              <Title style={styles.cardTitle}>Fecha de Envio: {formatDate(purchaseOrder.shippingDate)}</Title>
            </Card.Content>
            <View style={styles.badgeContainer}>
              <View style={getStatusBadgeStyle(purchaseOrder.statusCode)}>
                <Text>
                  {purchaseOrder.statusCode === 4 ? 'Enviada a Proveedor' : purchaseOrder.statusCode === 6 ? 'Aceptada' : purchaseOrder.statusCode === 5 ? 'En proceso' :
                   purchaseOrder.statusCode === 9 ? 'Cancelada' : purchaseOrder.statusCode === 12 ? 'Recepcion Conforme' : purchaseOrder.statusCode === 13 ? 'Pendiente de Recepcionar' :
                   purchaseOrder.statusCode === 14 ? 'Recepcionada Parcialmente' : purchaseOrder.statusCode === 15 ? 'Recepcion Conforme Incompleta' : null}
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
    height: 'auto',
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
  },
  closedBadge: {
    backgroundColor: '#FFDFDF', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  enProcesoBadge: {
      color: '#2F54EB',
      backgroundColor: '#E1E7FF',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  aceptadaBadge: {
      color: '#048939',
      backgroundColor: '#D3F2DF',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  canceladaBadge: {
      color: '#727275',
      backgroundColor: '#EEEEEE',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  recepcionConformeBadge: {
      color: '#653701',
      backgroundColor: '#FCF1DE',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  pendienteRecepcionarBadge: {
      color: '#A3078E',
      backgroundColor: '#FDEFFF',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  recepcionadaParcialmenteBadge: {
      color: '#A60100',
      backgroundColor: '#FEF3F1',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  recepcionConformeIncompletaBadge: {
      color: '#3F594D',
      backgroundColor: '#E8FFF4',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  },
  default: {
      color: '#000',
      backgroundColor: '#F2F2F2',
      justifyContent: 'center',
      marginRight: '2%',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
  }
});
