// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import SearchScreen from "./screens/SearchScreen";
// import PinnedScreen from "./screens/PinnedScreen";
// import { PinnedWordsProvider } from "./context/PinnedWordsContext";

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <PinnedWordsProvider>
//       <NavigationContainer>
//         <Tab.Navigator
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ color, size }) => {
//               let iconName;
//               if (route.name === "Search") {
//                 iconName = "search";
//               } else if (route.name === "Pinned") {
//                 iconName = "bookmark";
//               }
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: "tomato",
//             tabBarInactiveTintColor: "gray",
//           })}
//         >
//           <Tab.Screen name="Search" component={SearchScreen} />
//           <Tab.Screen name="Pinned" component={PinnedScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </PinnedWordsProvider>
//   );
// }


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "./screens/SearchScreen";
import PinnedScreen from "./screens/PinnedScreen";
import { PinnedWordsProvider } from "./context/PinnedWordsContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PinnedWordsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerTitle: "LexiVault", // Set the title at the top
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Search") {
                iconName = "search";
              } else if (route.name === "Pinned") {
                iconName = "bookmark";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Pinned" component={PinnedScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PinnedWordsProvider>
  );
}
