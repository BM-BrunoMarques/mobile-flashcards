import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import Home from "./Home";
import CreateDeck  from "./CreateDeck";
import { Feather } from "@expo/vector-icons";
import { darkPurple, white, lightPurple } from '../utils/colors'


const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator

      barStyle={{ backgroundColor: darkPurple }}
      tabBarOptions={{
        activeTintColor: white,
        inactiveTintColor: lightPurple,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          animationEnabled: true,
          tabBarIcon: ({color}) => (
            <Feather name="home" color={color} size={25} />
          ),
        }}
        name="decklist"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Add Deck",
          animationEnabled: true,
          tabBarIcon: ({ color }) => (
            <Feather name="folder-plus" color={color} size={24} />
          ),
        }}
        name="adddeck"
        component={CreateDeck}
      />
    </Tab.Navigator>
  );
}
