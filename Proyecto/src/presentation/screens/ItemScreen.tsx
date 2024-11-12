import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Linking, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParams } from "../navigator/StackNavigator";
import { getItems } from "../../actions/getItems/getItems";
import { LoaderScreen } from "../components/LoaderScreen";
import { IonIcon } from "../components/shared/IonIcon";

interface ItemBase {
  id: number;
  description: string;
  quantity: number;
  name: string;
  quote_id?: string;
  mp_id: string;
}

interface TenderItem extends ItemBase {
  mp_id: string;
  product_name: string;
  product_code: string;
}

interface AgileItem extends ItemBase {
  mp_id: string;
}

interface MarcoItem extends ItemBase {
  quote_id: string;
  attached_document?: string;
  budget?: string;
  name: string;
}

interface QuoteItem extends ItemBase {
  quote_id: string;
}

type Item = TenderItem | MarcoItem | AgileItem | QuoteItem;

type ItemScreenRouteProp = RouteProp<RootStackParams, 'ItemList'>;

export const ItemScreen = ({ route }: { route: ItemScreenRouteProp }) => {
  const { code = '', itemsText = '', type } = route.params;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (type && (code || itemsText)) {
          const fetchedItems = await getItems(code, type);

          if (type === 'marco_quote') {
            setItems(fetchedItems.marco_product);
          } else {
            setItems(fetchedItems);
          }
        } else {
          throw new Error('Tipo o parámetros de item no válidos.');
        }
      } catch (err) {
/*         console.log(err); */
        setError('Error al cargar los items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [code, itemsText, type]);

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items de la oportunidad:</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
              {'product_name' in item ? item.product_name : item.name}
            </Text>
            <Text style={styles.itemDescription}>{item.description}</Text>

            <View style={styles.row}>
              <IonIcon name="cube-outline" size={16} color="#666" />
              <Text style={styles.itemDetail}>Cantidad: {item.quantity}</Text>
            </View>

            <View style={styles.row}>
              <IonIcon name="barcode-outline" size={16} color="#666" />
              <Text style={styles.itemDetail}>
                Código:
                {type === 'agile'
                  ? item.mp_id
                  : type === 'marco_quote'
                    ? item.id
                    : 'product_code' in item
                      ? item.product_code
                      : item.quote_id}
              </Text>
            </View>

            {isMarcoItem(item) && item.attached_document && (
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => Linking.openURL(item.attached_document!)}
              >
                <IonIcon name="document-outline" size={16} color="#fff" />
                <Text style={styles.linkText}>Ver documento adjunto</Text>
              </TouchableOpacity>
            )}

            {isMarcoItem(item) && item.budget && (
              <Text style={styles.itemBudget}>Presupuesto: {item.budget}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const isMarcoItem = (item: Item): item is MarcoItem => {
  return (item as MarcoItem).quote_id !== undefined;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',  // Fondo gris claro moderno
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,  // Bordes redondeados más pronunciados
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
    borderWidth: 0.5
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  linkText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  itemBudget: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',  // Verde para el presupuesto
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
