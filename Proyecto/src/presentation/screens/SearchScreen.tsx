import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator } from "react-native";
import { MaterialIcon } from "../components/shared/MaterialIcon";
import { useFollowStore } from "../../store/follow/useFollowStore"; 

export const SearchScreen = () => {
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
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por ID o palabra clave"
          autoFocus
          autoCorrect={false}
          value={searchText}
          onChangeText={setSearchText}
        />
        <MaterialIcon name="search" size={24} color="gray" />
      </View>

      <FlatList
        data={filteredOpportunities}
        keyExtractor={(opportunity) => opportunity.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>{item.code}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
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
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
