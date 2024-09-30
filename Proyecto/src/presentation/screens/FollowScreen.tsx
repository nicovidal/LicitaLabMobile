import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFollowStore } from '../../store/follow/useFollowStore';


export const FollowScreen = () => {
  const { opportunities, loading, error, fetchFollowedOpportunities } = useFollowStore();

  useEffect(() => {
    fetchFollowedOpportunities(true); 
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }

  if (error) {
    return <Text>Error: {error}</Text>; 
  }

  return (
    <View>
      <Text>Followed Opportunities:</Text>
      {opportunities.map((opportunity) => (
        <View key={opportunity.id}>
          <Text>Code: {opportunity.code}</Text> 
          <Text>Name: {opportunity.name}</Text> 
        </View>
      ))}
    </View>
  );
};
