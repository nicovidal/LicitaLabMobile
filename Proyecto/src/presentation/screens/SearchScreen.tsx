import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator, TouchableOpacity, useColorScheme } from "react-native";
import { MaterialIcon } from "../components/shared/MaterialIcon";
import { useFollowStore } from "../../store/follow/useFollowStore"; 
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/StackNavigator";
import { Card } from "react-native-paper";

interface Props extends StackScreenProps<RootStackParams, 'Search'> { }

export const SearchScreen = ({ navigation }: Props) => {
  const colorScheme = useColorScheme();

  const { opportunities, loading, error } = useFollowStore();
  const [searchText, setSearchText] = useState("");
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);

  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const normalizedSearchText = normalizeText(searchText.toLowerCase());
      
      const filtered = opportunities.filter(opportunity => {
        const normalizedOpportunityName = normalizeText(opportunity.name.toLowerCase());
        const normalizedOpportunityCode = normalizeText(opportunity.code.toLowerCase());
        
        return normalizedOpportunityName.includes(normalizedSearchText) || 
               normalizedOpportunityCode.includes(normalizedSearchText);
      });

      setFilteredOpportunities(filtered);
    }, 300); 
    return () => clearTimeout(debouncer);
  }, [searchText, opportunities]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const inputStyles = {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: colorScheme === 'dark' ? '#FFF' : '#000', 
    backgroundColor: colorScheme === 'dark' ? '#FFF' : '#FFF', 
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyles}
          placeholder="Buscar por ID o palabra clave"
          autoFocus
          autoCorrect={false}
          value={searchText}
          onChangeText={setSearchText}
          accessibilityLabel="SearchInput"
          placeholderTextColor={colorScheme === 'dark' ? '#CCC' : '#666'} 
        />
        <MaterialIcon name="search" size={24} color="gray" />
      </View>
      <FlatList
        data={filteredOpportunities}
        keyExtractor={(opportunity) => opportunity.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <TouchableOpacity 
              style={styles.itemContainer}
              onPress={() => navigation.navigate('Details', { code: item.code, type: item.type })}
            >
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.code}</Text>
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  card: {
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,

  },
  itemContainer: {
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 16,
    color:'#000',
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
