import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function FavoritesScreen({ favorites, setFavorites }) {
  useEffect(() => {
    const showingFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("Favorites");
        const favoritesArray = JSON.parse(favoritesString || "[]");
        setFavorites(favoritesArray);
      } catch (error) {
        console.log("Error loading favorites: ", error);
      }
    };
    showingFavorites();
  }, []);

  const removeFromFavorites = async (id) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.idDrink !== id);
      await AsyncStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.log("Error removing from favorites: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.idDrink)}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.strDrink}
                </Text>

                <TouchableOpacity
                  onPress={() => removeFromFavorites(item.idDrink)}>
                  <Feather name="trash" size={24} color="#C892C9" />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <Image
                  style={styles.imageBackground}
                  source={{ uri: item.strDrinkThumb }}
                />
              </View>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
    fontWeight: "bold",
    color: "#C892C9",
  },
  imageBackground: {
    width: 250,
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  flex: {
    marginVertical: 20,
  },
  flexTitle: {
    fontWeight: "bold",
  },
  favorites: {
    flexDirection: "row",
    marginTop: 10,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
    fontWeight: "bold",
  },
});
