// DashBoardCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DashBoardCard = ({ title, count }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardCount}>{count}</Text>
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
    elevation: 5, // Para Android
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,  
    height: 140, 
  },
  cardTitle: {
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardCount: {
    fontSize: 20,  
    fontWeight: 'bold',
  },
});
