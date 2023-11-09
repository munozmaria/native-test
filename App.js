import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ArrowIcon from "./components/ArrowIcon";
import FavoritesScreen from "./screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
                name="Home"
                component={HomeScreen}
                options={{
                  title: "Cocktails List",
                }}
              />
              <Stack.Screen
                name="Details"
                options={{
                  headerLeft: () => <ArrowIcon />,
                }}>
                {(props) => <DetailsScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: () => (
              <AntDesign name="heart" color="#790e7c" size={22} />
            ),
          }}></Tab.Screen>
      </Tab.Navigator>
      {/* <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#C892C9",
          },
          headerTitleStyle: { color: "white", fontWeight: "bold" },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Fruits Api",
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerLeft: () => <ArrowIcon />,
          }}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
