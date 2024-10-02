import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { RootStackParams } from '../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'Details'> { }

export const FollowScreen = ({ navigation }: Props) => {
  const { visibleOpportunities, loading, error, fetchFollowedOpportunities, loadMoreOpportunities } = useFollowStore();

  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    fetchFollowedOpportunities(); 
  }, []);

  if (loading && visibleOpportunities.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

 
  const truncateText = (text: string, maxLength: number) => {
    if (numColumns === 2 && text.length > maxLength) {
      return text.substring(0, maxLength) + '...'; 
    }
    return text; 
  };

  return (
    <View style={styles.container}>
      <Button
        title={`Cambiar a ${numColumns === 2 ? '1' : '2'} tarjeta(s) por fila`}
        onPress={() => setNumColumns(numColumns === 2 ? 1 : 2)} 
      />
      <FlatList
        data={visibleOpportunities}
        keyExtractor={(opportunity) => opportunity.id.toString()}
        numColumns={numColumns}
        key={`flatlist-${numColumns}`} 
        renderItem={({ item: opportunity }) => {
          console.log(opportunity); // Inspecciona el objeto opportunity
          return (
            <View style={{ flex: 1, margin: 5 }}>
              <Card
                style={[
                  styles.card,
                  { backgroundColor: opportunity.type === 'agile' ? '#8054FF' : '#F9523B' }
                ]}
                onPress={() => navigation.navigate('Details', { code: opportunity.code })}
              >
                <Card.Content>
                  <Title style={styles.cardTitle}>{opportunity.code}</Title>
                  <Title style={styles.cardTitle}>{truncateText(opportunity.name, 20)}</Title>
                  <Title style={styles.cardTitle}> {new Date(opportunity.closing_date).toLocaleDateString()}</Title>
                </Card.Content>
              </Card>
            </View>
          );
        }}
        
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreOpportunities}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null} 
      />
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
    margin: 1,
    elevation: 2,
    height: 220, 
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#000000'
  },
  cardTitle: {
    color: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
