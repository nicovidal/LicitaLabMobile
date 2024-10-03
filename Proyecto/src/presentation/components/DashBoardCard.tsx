import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const DashBoardCard = ({ title, count, loading }: { title: string; count: number; loading: boolean }) => {
  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.cardCount}>{count}</Text>
      )}
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 140,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333', 
  },
  cardCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', 
  },
});
