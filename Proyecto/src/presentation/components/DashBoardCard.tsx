import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

export const DashBoardCard = ({ title, count, loading }: { title: string; count: number; loading: boolean }) => {
  const { width } = Dimensions.get('window');
  const isTablet = width > 768; 
  
  return (
    <View style={isTablet ? styles.cardTablet : styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={isTablet ? styles.cardCountTablet : styles.cardCount}>{count}</Text>
      )}
      <Text style={isTablet ? styles.cardTitleTablet : styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 0.8,
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
  cardTablet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,  
    height: 240, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  cardTitleTablet: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  cardCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardCountTablet: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: '#333',
  },
});
