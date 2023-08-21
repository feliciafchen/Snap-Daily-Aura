import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import BasicChatbot from "../chatbots/BasicChatbot";
import BakersChatbot from "../chatbots/BakersChatbot";

export default function ConversationScreen({ route, navigation }) {
  const { isChatbot, chatId } = route.params;
  const insets = useSafeAreaInsets();

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {isChatbot ? makeChatbotComponent(chatId) : <UserChat chatId={chatId} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
