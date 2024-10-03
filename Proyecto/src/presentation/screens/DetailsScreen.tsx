import { useEffect, useState } from "react"; 
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper"; 
import { getDetails } from "../../actions/details/getDetails";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../navigator/StackNavigator';
import { LoaderScreen } from "../components/LoaderScreen";

interface OpportunityDetails {
  id: number;
  title: string;
  code: string;
  description: string;
  organism: string;
  closing_date: any;
}

type DetailsScreenRouteProp = RouteProp<RootStackParams, 'Details'>;



export const DetailsScreen = () => {
  const [details, setDetails] = useState<OpportunityDetails | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const route = useRoute<DetailsScreenRouteProp>();
  const { code } = route.params; 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedDetails = await getDetails(code);
        console.log("Detalles recibidos:", fetchedDetails);
        setDetails({
          id: fetchedDetails.id,
          title: fetchedDetails.name,
          code: fetchedDetails.code,
          description: fetchedDetails.description,
          organism: fetchedDetails.organism,
          closing_date: fetchedDetails.closing_date
        });
      } catch (error) {
        console.error("Error al obtener detalles:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDetails();
  }, [code]);

  return (
    <View style={styles.container}>
      {loading ? ( 
    /*     <ActivityIndicator size="large" color="#0000ff" /> */
    <LoaderScreen/>
      ) : details ? (
        <Card style={styles.card}>
          <Card.Content>
            <Title>{details.title}</Title>
            <Paragraph>Code: {details.code}</Paragraph>
            <Paragraph>Description: {details.description}</Paragraph>
            <Paragraph>Organism: {details.organism}</Paragraph>
            <Paragraph>Closing Date: {new Date(details.closing_date).toLocaleDateString()}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Paragraph>No se encontraron detalles.</Paragraph>
      )}
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
    margin: 10,
    backgroundColor: '#fff',
  },
});
