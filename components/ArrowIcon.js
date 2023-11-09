import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function ArrowIcon() {
  const navigation = useNavigation();
  return (
    <FontAwesome5
      name="cocktail"
      size={25}
      color="white"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
