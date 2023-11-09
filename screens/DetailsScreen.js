import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function DetailsScreen({ route }) {
  console.log(route);
  const { i } = route.params;

  const { data, loading } = useFetch(`lookup.php?i=${i}`);

  return loading === true ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.idDrink)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Image
                style={styles.imageBackground}
                source={{ uri: item.strDrinkThumb }}
              />
              <Text numberOfLines={1} style={styles.title}>
                {item.strDrink}
              </Text>
              <View style={styles.flex}>
                {item.strInstructions ? (
                  <>
                    <Text style={styles.flexTitle}>Instructions:</Text>
                    <Text> {item.strInstructions}</Text>
                  </>
                ) : (
                  ""
                )}
              </View>
              <View>
                <Text style={styles.flexTitle}>Ingredients:</Text>
                <Text>{item.strIngredient1}</Text>
                <Text>{item.strIngredient2}</Text>
                <Text>{item.strIngredient3}</Text>
                <Text>{item.strIngredient4}</Text>
                <Text>{item.strIngredient5}</Text>
              </View>
            </TouchableOpacity>
          );
        }}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageBackground: {
    width: 250,
    height: 250,
    objectFit: "cover",
    borderRadius: 10,
  },
  title: {
    marginVertical: 20,
    fontWeight: "bold",
    color: "#C892C9",
  },
  flex: {
    paddingBottom: 20,
  },
  flexTitle: {
    fontWeight: "bold",
  },
});
