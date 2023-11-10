import React from "react";
import useFetch from "../hooks/useFetch";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

export default function ListScreen({ navigation }) {
  const { data, loading } = useFetch("filter.php?c=Ordinary_Drink");

  return loading === true ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.idDrink)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                  navigation.navigate("Details", { i: item.idDrink });
                }}>
                <Image
                  style={styles.imageBackground}
                  source={{ uri: item.strDrinkThumb }}
                />
                <Text numberOfLines={1} style={styles.title}>
                  {item.strDrink}
                </Text>
              </TouchableOpacity>
            );
          }}></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 5,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageBackground: {
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    marginVertical: 20,
    fontWeight: "bold",
    color: "#C892C9"
  },
});
