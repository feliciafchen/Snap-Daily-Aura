import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { Image } from "react-native";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  function getChatbots() {
    // add the chatbots to an array
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId });
      // console.log("adding bot", bot);
    }

    //add them to our list of chats
    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  async function getUserChats() {
    // get all of the "user chats" from firebase
    const querySnapshot = await getDocs(collection(db, "Chats"));

    // add the user chats to an array
    let userChatsTemp = [];
    querySnapshot.forEach((userChat) => {
      userChatsTemp.push({ isChatbot: false, chatId: userChat.id });
    });

    //add them to our list of chats
    setChats((otherChats) => [...otherChats, ...userChatsTemp]);
  }

  useEffect(() => {
    // if we already have our chats loaded, don't get them again
    if (chats.length < 1) {
      getChatbots();
      getUserChats();
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />
      <View style={styles.container}>
        <Image source={require("../../assets/Cells.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-2.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-3.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-4.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-5.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-6.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-7.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-8.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-9.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-10.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-10.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-10.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-10.png")}></Image>
        <Image source={require("../../assets/chatcells/Cell-10.png")}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
