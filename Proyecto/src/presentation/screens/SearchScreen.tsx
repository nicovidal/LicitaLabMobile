import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialIcon } from "../components/shared/MaterialIcon";


export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por ID o palabra clave"
          autoFocus
          autoCorrect={false}
        />
        <MaterialIcon name="search" size={24} color="gray"  />
      </View>
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
});

