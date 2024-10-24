import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { getDetails } from "../../actions/details/getDetails";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from '../navigator/StackNavigator';
import { LoaderScreen } from "../components/LoaderScreen";
import { getDetailsTenders } from "../../actions/getDetailsTenders/getDetailsTenders";
import { getAgileDetails } from "../../actions/getDetailsAgiles/getDetailsAgiles";
import { getDetailsQuotes } from "../../actions/getDetailsQuotes/getDetailsQuotes";
import { getDetailsMarcoQuotes } from "../../actions/getDetailsMarcoQuotes/getDetailsMarcoQuotes";

interface OpportunityDetails {
  id?: number;
  title?: string;
  code: string;
  description?: string;
  organism?: string;
  closing_date?: any;
  publish_date?: any;
  available_amount: string;
  applied_amount: string;
  items_text?: string;
  contractResponsibleName?: string;
  contact_name?: string;
  city?: string;
  tax_number?: string;
  estimated_awarding?: string;
  shipping_address?: string;
  org_name?: string;
  unit?: string;

}

interface Props extends StackScreenProps<RootStackParams, 'Details'> { }

export const DetailsScreen = ({ navigation, route }: Props) => {
  const [details, setDetails] = useState<OpportunityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { code, type } = route.params;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let fetchedDetails;
        if (type === 'tender') {
          fetchedDetails = await getDetails(code);
          const fetchedDetailsTenders = await getDetailsTenders(code);
          setDetails({
            id: fetchedDetails.id,
            title: fetchedDetails.name,
            code: fetchedDetails.code,
            description: fetchedDetails.description,
            organism: fetchedDetails.organism,
            closing_date: fetchedDetails.closing_date,
            publish_date: fetchedDetails.publish_date,
            available_amount: fetchedDetails.available_amount,
            applied_amount: fetchedDetails.applied_amount,
            items_text: fetchedDetails.items_text,
            contractResponsibleName: fetchedDetailsTenders.contractResponsibleName,
            city: fetchedDetailsTenders.city,
            tax_number: fetchedDetailsTenders.tax_number,
            estimated_awarding: fetchedDetailsTenders.estimated_awarding,
          });
        } else if (type === 'agile') {
          fetchedDetails = await getAgileDetails(code);
          setDetails({
            id: fetchedDetails.id,
            title: fetchedDetails.name,
            code: fetchedDetails.code,
            description: fetchedDetails.description,
            organism: fetchedDetails.organism,
            closing_date: fetchedDetails.closing_date,
            publish_date: fetchedDetails.publish_date,
            available_amount: fetchedDetails.available_amount,
            applied_amount: fetchedDetails.applied_amount,
            items_text: fetchedDetails.items_text,
            contact_name: fetchedDetails.contact_name,
            shipping_address: fetchedDetails.shipping_address,
            tax_number: fetchedDetails.tax_number,
            estimated_awarding: fetchedDetails.estimated_awarding,
            org_name: fetchedDetails.org_name
          });
        } else if (type === 'quote') {
          fetchedDetails = await getDetailsQuotes(code)
          console.log(fetchedDetails)
          setDetails({
            title: fetchedDetails.name,
            code: fetchedDetails.code,
            description: fetchedDetails.description,
            contact_name: fetchedDetails.contact_name,
            available_amount: fetchedDetails.available_amount,
            publish_date: fetchedDetails.publish_date,
            closing_date: fetchedDetails.closing_date,
            applied_amount: fetchedDetails.applied_amount,
            shipping_address: fetchedDetails.shipping_address,

          });
        } else if (type === 'marco_quote') {
          fetchedDetails = await getDetailsMarcoQuotes(code)
          console.log(fetchedDetails)
          setDetails({
            code: fetchedDetails.marcoQuotes.code,
            title: fetchedDetails.marcoDetail.title,
            publish_date: fetchedDetails.marcoQuotes.publish_date,
            closing_date: fetchedDetails.marcoQuotes.closing_date,
            available_amount: fetchedDetails.marcoQuotes.available_amount,
            applied_amount: fetchedDetails.marcoQuotes.applied_amount,
            unit: fetchedDetails.marcoDetail.Unit.name,

          })
        }
      } catch (error) {
        console.error("Error al obtener detalles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [code, type]);

  const formatCurrency = (amount: string) => {
    const numberAmount = parseFloat(amount);
    return numberAmount ? `$${numberAmount.toLocaleString()}` : '$0';
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoaderScreen />
      ) : details ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>{details.code}</Title>
              <Paragraph style={styles.subtitle}>
                {type === 'tender'
                  ? details.organism
                  : type === 'marco_quote'
                    ? details.title // Aquí estás utilizando details.title
                    : details.org_name}
              </Paragraph>
              <Paragraph style={styles.description}>{details.description}</Paragraph>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Paragraph style={styles.label}>Responsable</Paragraph>
                  <Paragraph style={styles.text}>
                    {type === 'tender'
                      ? details.contractResponsibleName
                        ? details.contractResponsibleName
                        : ''
                      : type === 'marco_quote'
                        ? details.unit
                        : details.contact_name}
                  </Paragraph>
                </View>
                <View style={styles.column}>
                  <Paragraph style={styles.label}>Monto Disponible</Paragraph>
                  <Paragraph style={styles.text}>{formatCurrency(details.available_amount)}</Paragraph>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Paragraph style={styles.label}>Fecha de Publicación</Paragraph>
                  <Paragraph style={styles.text}>{new Date(details.publish_date).toLocaleDateString()}</Paragraph>
                </View>
                <View style={styles.column}>
                  <Paragraph style={styles.label}>Monto Ofertado</Paragraph>
                  <Paragraph style={styles.text}>{formatCurrency(details.applied_amount)}</Paragraph>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Paragraph style={styles.label}>Fecha de Cierre</Paragraph>
                  <Paragraph style={styles.text}>{new Date(details.closing_date).toLocaleDateString()}</Paragraph>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Paragraph style={styles.label}>Ubicación</Paragraph>
                  <Paragraph style={styles.text}>
                    {type === 'tender'
                      ? (details.city ? details.city : 'Sin ubicación')
                      : (details.shipping_address ? details.shipping_address : 'Sin ubicación')}
                  </Paragraph>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  style={styles.buttonShowItem}
                  mode="contained"
                  onPress={() => {
                    if (type === 'tender') {
                      navigation.navigate('ItemList', { code: details.code, itemsText: details.items_text, type: 'tender' });
                    } else if (type === 'agile') {
                      navigation.navigate('ItemList', { code: details.code, itemsText: details.items_text, type: 'agile' });
                    } else if (type === 'quote') {
                      navigation.navigate('ItemList', { code: details.code, itemsText: details.items_text, type: 'quote' });
                    } else if (type === 'marco_quote') {
                      navigation.navigate('ItemList', { code: details.code, itemsText: details.items_text, type: 'marco_quote' });

                    }
                  }}
                >
                  Ver Items
                </Button>

              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      ) : (
        <Paragraph>No se encontraron detalles.</Paragraph>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
    padding: 0,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    elevation: 4,
    borderRadius: 10,
  },
  cardContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonShowItem: {
    backgroundColor: '#8054FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
});
