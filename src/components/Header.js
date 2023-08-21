import { Text, View, StyleSheet, Button, Image } from "react-native";
import { colors } from "../../assets/themes/colors";
import { fontHeader } from "../../assets/themes/font";
import { Followers, More, Search } from "../../assets/snapchat/HeaderIcons";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useEffect } from "react";
import db from "../../firebase";
import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const Stack = createStackNavigator();

export default function Header({ title }) {
  const { user } = useAuthentication();
  console.log("user:", user?.uid);

  const [auraColor, setAuraColor] = React.useState(
    colors.interactionGraySubtle
  );
  const navigation = useNavigation();

  async function getAura() {
    onSnapshot(doc(db, "Users", user.uid), (doc) => {
      console.log("Curr Data:", doc.data().Aura);
      if (doc.data().Aura === undefined) {
        setAuraColor(colors.interactionGraySubtle);
      } else {
        setAuraColor(doc.data().Aura);
      }
    });
  }

  getAura();

  useEffect(() => {
    getAura();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable
          style={[{ backgroundColor: auraColor }, styles.profileButton]}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            style={styles.profileImage}
            source={require("../../assets/snapchat/defaultprofile.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.profile, styles.buttons]}
          onPress={() => {
            navigation.navigate("Aura");
          }}
        >
          <Image
            style={styles.profileImage}
            source={require("../../assets/auraicon.png")}
          />
        </Pressable>
        <View style={[styles.search, styles.buttons]}>
          <Search />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.headerRight}>
        <View style={[styles.followers, styles.buttons]}>
          <Followers />
        </View>
        <View style={[styles.more, styles.buttons]}>
          <More />
        </View>
      </View>
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  profileButton: {
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  buttons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    backgroundColor: colors.interactionGraySubtle,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileButtons: {
    borderRadius: 100,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
