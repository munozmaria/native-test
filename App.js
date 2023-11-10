import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";

import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ArrowIcon from "./components/ArrowIcon";
import FavoritesScreen from "./screens/FavoritesScreen";
import {useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);

  //console.log(JSON.stringify(favorites, null, 2));

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="List">
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color="#790e7c" size={26} />
            ),
          }}>
          {() => (
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#C892C9",
                },
                headerTitleStyle: { color: "white", fontWeight: "bold" },
              }}>
              <Stack.Screen
                name="List"
                component={ListScreen}
                options={{
                  title: "Cocktails List",
                }}
              />
              <Stack.Screen
                name="Details"
                options={{
                  headerLeft: () => <ArrowIcon />,
                }}>
                {(props) => (
                  <DetailsScreen setFavorites={setFavorites} {...props} />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Saved"
          options={{
            tabBarIcon: () => (
              <AntDesign name="heart" color="#790e7c" size={22} />
            ),
          }}>
          {() => (
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#C892C9",
                },
                headerTitleStyle: { color: "white", fontWeight: "bold" },
              }}>
              <Stack.Screen favorites={favorites} name="Favorites">
                {(props) => (
                  <FavoritesScreen
                    name="Favorites"
                    favorites={favorites}
                    setFavorites={setFavorites}
                    {...props}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
