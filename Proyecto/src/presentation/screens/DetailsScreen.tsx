import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { getDetails } from "../../actions/details/getDetails";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../navigator/StackNavigator';
import { LoaderScreen } from "../components/LoaderScreen";
import { StackScreenProps } from "@react-navigation/stack";

interface OpportunityDetails {
  id: number;
  title: string;
  code: string;
  description: string;
  organism: string;
  closing_date: any;
  publish_date: any;
}


interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({navigation,route}:Props) => {
  const [details, setDetails] = useState<OpportunityDetails | null>(null);
  const [loading, setLoading] = useState(true);
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
          closing_date: fetchedDetails.closing_date,
          publish_date: fetchedDetails.publish_date
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
        <LoaderScreen />
      ) : details ? (
        <Card style={styles.card}>
          <Card.Content>
            <Title>{details.title}</Title>
            <Paragraph>{details.code}</Paragraph>
            <Paragraph>Description: {details.description}</Paragraph>
            <Paragraph>{details.organism}</Paragraph>
            <Paragraph>Fecha de Publicacion: {new Date(details.publish_date).toLocaleDateString()}</Paragraph>
            <Paragraph>Fecha de cierre: {new Date(details.closing_date).toLocaleDateString()}</Paragraph>
            <Button
              style={styles.buttonShowItem}
              mode="contained"
              onPress={() => navigation.navigate('ItemList')}
            >
               Ver Items
            </Button>
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
    padding: 0,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    margin: 0,
    backgroundColor: '#fff',
  },
  buttonShowItem:{
    backgroundColor: '#8054FF',
    paddingHorizontal: 20,
    borderRadius: 6,
  }
});
