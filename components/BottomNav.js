import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import Home from "./Home";
import CreateDeck  from "./CreateDeck";
import { Feather } from "@expo/vector-icons";


const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      activeColor='#000000'
      inactiveColor='#000000'
      barStyle={{ backgroundColor: '#ff0000' }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color='#000000' size={24} />
          ),
        }}
        name="decklist"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Add Deck",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color='#000000' size={24} />
          ),
        }}
        name="adddeck"
        component={CreateDeck}
      />
    </Tab.Navigator>
  );
}
