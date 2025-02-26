import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import PinnedScreen from "../screens/PinnedScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Pinned") {
            iconName = "bookmark";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Pinned" component={PinnedScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
