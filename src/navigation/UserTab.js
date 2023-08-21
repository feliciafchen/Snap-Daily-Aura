import React, { useLayoutEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Pressable, Text } from "react-native";

import {
  CameraOutline,
  LensSearchFill,
  ChatOutline,
  ChatFill,
  GroupOutline,
  GroupFill,
  MapPinOutline,
  MapPinFill,
  PlayOutline,
  PlayFill,
} from "../../assets/snapchat/NavigationIcons";
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "react-native";

import { getAuth, signOut } from "firebase/auth";

// Screens
import MapScreen from "../screens/MapScreen";
import CameraScreen from "../screens/CameraScreen";
import StoriesScreen from "../screens/StoriesScreen";
import SpotlightScreen from "../screens/SpotlightScreen";
import ChatScreen from "../screens/ChatScreen";

// Stacks
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function UserStack({ route, navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  let screenOptions = {
    tabBarShowLabel: false,
    headerLeft: () => (
      <Button
        onPress={() => {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              user = null;
            })
            .catch((error) => {
              // An error happened.
              // should we do something with that error??
            });
        }}
        title="Log Out"
      />
    ),
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: "black",
      }}
      initialRouteName="Camera"
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={(screenOptions, { headerShown: false })}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={(screenOptions, { headerShown: false })}
      />
      <Tab.Screen
        name="Spotlight"
        component={SpotlightScreen}
        options={screenOptions}
      />
    </Tab.Navigator>
  );
}

const getTabIcon = (routeName, focused) => {
  if (routeName == "Map") {
    return focused ? <MapPinFill /> : <MapPinOutline />;
  } else if (routeName === "Chat") {
    return focused ? <ChatFill /> : <ChatOutline />;
  } else if (routeName === "Camera") {
    return focused ? <LensSearchFill /> : <CameraOutline />;
  } else if (routeName === "Stories") {
    return focused ? <GroupFill /> : <GroupOutline />;
  } else if (routeName === "Spotlight") {
    return focused ? <PlayFill /> : <PlayOutline />;
  }
};

const CustomTabBar = (props) => {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.grayRectangle}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;

          // Customize the active tab style
          const isActive = state.index === index;
          const tabStyle = isActive ? styles.activeTab : styles.inactiveTab;

          return (
            <Pressable
              key={route.key}
              style={[styles.tab, tabStyle]}
              onPress={() => navigation.navigate(route.name)}
            >
              {getTabIcon(route.name, isActive)}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    bottom: 0,
  },
  grayRectangle: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.belowPage,
    borderRadius: 100,
    height: 48,
  },
  tab: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
