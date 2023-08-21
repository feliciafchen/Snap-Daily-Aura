import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../../firebase";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { View, Text } from "react-native";

export default function UserChat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const chatRef = doc(db, "Chats", chatId);

  const { user, userData } = useAuthentication();

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(chatRef, (snapshot) => {
      const dbMessages = snapshot.data().messages;

      // if we've already seen the most recent message, don't refresh
      if (
        dbMessages.length > 0 &&
        messages.length > 0 &&
        dbMessages.slice(-1).createdAt == messages.slice(-1).createdAt
      )
        return;

      let fixTimestampMessages = dbMessages.map((obj) => {
        return {
          ...obj,
          createdAt: obj.createdAt.toDate(),
        };
      });

      setMessages(fixTimestampMessages.reverse());
    });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((newMessages = []) => {
    updateDoc(chatRef, {
      // arrayUnion appends the message to the existing array
      messages: arrayUnion(newMessages[0]),
    });

    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  }, []);

  // if the user or user data doesn't exist, don't load da chat
  if (!user || !userData || !chatRef) {
    return (
      <View>
        <Text>Missing user data or chat ref</Text>
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: user ? user.uid : "anon-user-id",
        name: userData ? userData.name : "Anonymous",
        // avatar: "https://placeimg.com/140/140/any",
      }}
      // showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
