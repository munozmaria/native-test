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

export default function HomeScreen({ navigation }) {
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
    alignItems: "center",
    paddingHorizontal: 5,
  },
  imageBackground: {
    height: 250,
    objectFit: "cover",
    borderRadius: 10,
  },
  title: {
    marginVertical: 20,
    fontWeight: "bold",
  },
});
