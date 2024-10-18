import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Linking } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParams } from "../navigator/StackNavigator";
import { getItems } from "../../actions/getItems/getItems";
import { LoaderScreen } from "../components/LoaderScreen";


interface ItemBase {
  id: number;
  description: string;
  quantity: number;
  name:string;
  quote_id?:string;
  mp_id:string;
}


interface TenderItem extends ItemBase {
  mp_id: string;
  product_name: string;
  product_code: string;
}

interface AgileItem extends ItemBase{
  mp_id:string;
  
}


interface MarcoItem extends ItemBase {
  quote_id: string;
  attached_document?: string;
  budget?: string;
  name: string; 
}

interface QuoteItem extends ItemBase{
  quote_id:string;
}


type Item = TenderItem | MarcoItem | AgileItem|QuoteItem;

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
        console.log(err);
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
      <Text style={styles.title}>Items oportunidad:</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
              {'product_name' in item ? item.product_name : item.name}
            </Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemDescription}>Cantidad: {item.quantity}</Text>
            <Text style={styles.itemDescription}>
              Código: {
                type === 'agile'
                  ? item.mp_id 
                  : 'product_code' in item 
                    ? item.product_code 
                    : item.quote_id
              }
            </Text>
            {isMarcoItem(item) && item.attached_document && (
              <Text
                style={styles.link}
                onPress={() => item.attached_document && Linking.openURL(item.attached_document!)} 
              >
                Ver documento adjunto
              </Text>
            )}
            {isMarcoItem(item) && item.budget && (
              <Text style={styles.itemDescription}>Presupuesto: {item.budget}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
