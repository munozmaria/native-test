import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function DetailsScreen({ route, setFavorites }) {
  //console.log(route);
  const { i } = route.params;

  const { data, loading } = useFetch(`lookup.php?i=${i}`);

  const addToFavorites = async (item) => {
    try {
      const favoritesString = await AsyncStorage.getItem("Favorites");
      let favoritesArray = JSON.parse(favoritesString || "[]");

      const isItemInFavorites = favoritesArray.find(
        (favorite) => favorite.idDrink === item.idDrink
      );
      if (!isItemInFavorites) {
        favoritesArray.push(item);
        await AsyncStorage.setItem("Favorites", JSON.stringify(favoritesArray));
        //console.log(favoritesArray);
        setFavorites(favoritesArray);
      } else {
        console.log("This cocktail is already in the list.");
      }
    } catch (error) {
      console.log("Error adding to favorites: ", error);
    }
  };

  return loading === true ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.idDrink)}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.container}>
                <Image
                  style={styles.imageBackground}
                  source={{ uri: item.strDrinkThumb }}
                />
              </View>
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
              <TouchableOpacity
                style={styles.favorites}
                onPress={() => addToFavorites(item)}>
                <Text style={styles.flexTitle}>Add to your favorites</Text>
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            </View>
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
    width: 150,
    height: 150,
    resizeMode: "cover",
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
  favorites: {
    flexDirection: "row",
    marginTop: 10,
    padding: 20,
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
    fontWeight: "bold",
  },
});
