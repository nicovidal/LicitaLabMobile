import { useEffect, useState } from "react"; 
import { Text, View } from "react-native";
import { getDetails } from "../../actions/details/getDetails";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../navigator/StackNavigator';


interface OpportunityDetails {
  id: number;
  title: string;
  code:string;
  description:string;
  organism:string;
  closing_date:any;
}

type DetailsScreenRouteProp = RouteProp<RootStackParams, 'Details'>;

export const DetailsScreen = () => {
  const [details, setDetails] = useState<OpportunityDetails | null>(null);
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
          code:fetchedDetails.code,
          description:fetchedDetails.description,
          organism:fetchedDetails.organism,
          closing_date:fetchedDetails.closing_date
        });
      } catch (error) {
        console.error("Error al obtener detalles:", error);
      }
    };

    fetchDetails();
  }, [code]);

  return (
    <View>
      {details ? (
        <>
          <Text>Code: {details.code}</Text>
          <Text>Nombre: {details.title}</Text>
          <Text>Descripcion:{details.description}</Text>
          <Text>Organismo:{details.organism}</Text>
          <Text>Organismo:{details.closing_date}</Text>
        </>
      ) : (
        <Text>Cargando detalles...</Text>
      )}
    </View>
  );
};
