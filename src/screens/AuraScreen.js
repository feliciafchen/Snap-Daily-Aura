import React from "react";
import { Image, Text, View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet, Modal, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getChat } from "../utils/getChatGPT";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function AuraScreen() {
  const { user } = useAuthentication();
  console.log("user:", user?.uid);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);

  const [questionOneIndex, setQuestionOneIndex] = React.useState(3);
  const [questionTwoIndex, setQuestionTwoIndex] = React.useState(3);
  const [questionThreeIndex, setQuestionThreeIndex] = React.useState(3);
  const [hexCode, setHexCode] = React.useState("#abd7eb");

  const [text, onChangeText] = React.useState("");

  const selections = {
    question1: ["sunny", "cloudy", "rainy", " "],
    question2: ["whole", "bitten", "crumbs", " "],
    question3: ["100%", "50%", "1%", " "],
  };

  async function createAura(hex) {
    const userDoc = doc(db, "Users", user.uid); // Reference to a specific document in the "Users" collection
    await updateDoc(userDoc, {
      Aura: hex,
    });
  }

  async function fetchHexColor(prompt) {
    const response = await getChat([
      {
        role: "system",
        content: `Give me a single hex code based on the words: ${prompt} and don't say anything else. Never give white. Only respond with the hex code and NO OTHER WORDS.`,
      },
    ]);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;

    if (content[0] === "#") setHexCode(content);
    console.log(content);
    setModalVisible(true);
    createAura(content);
  }

  function checkSelected(question, index) {
    if (question === 1) {
      if (questionOneIndex === index) return true;
      else return false;
    }
    if (question === 2) {
      if (questionTwoIndex === index) return true;
      else return false;
    }
    if (question === 3) {
      if (questionThreeIndex === index) return true;
      else return false;
    }
  }

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
        },
      ]}
    >
      <ImageBackground
        source={require("../../assets/Background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.header}>
          <Pressable style={styles.headerLeft}>
            <Image
              style={{ width: "70%", height: "55%" }}
              source={require("../../assets/auraicon.png")}
            ></Image>
          </Pressable>
          <Pressable style={styles.headerTextContainer}>
            <Text style={styles.headerText1}>Daily Aura</Text>
            <Text style={styles.headerText2}>Find your Daily Aura</Text>
          </Pressable>
          <Pressable
            style={styles.headerRight}
            onPress={() => {
              navigation.navigate("UserTab");
            }}
          >
            <Ionicons
              style={styles.textIcon}
              name="close"
              size={35}
              color="white"
            />
          </Pressable>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.text}>
            On a scale of sunny to rainy, how was your morning?
          </Text>
          <View style={styles.optionsContainer}>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(1, 0) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionOneIndex(0);
              }}
            >
              <Image source={require("../../assets/choices/sunny.png")}></Image>
            </Pressable>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(1, 1) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionOneIndex(1);
              }}
            >
              <Image
                source={require("../../assets/choices/cloudy.png")}
              ></Image>
            </Pressable>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(1, 2) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionOneIndex(2);
              }}
            >
              <Image source={require("../../assets/choices/rainy.png")}></Image>
            </Pressable>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.text}>
            Which cookie best represents your mental clarity?
          </Text>
          <View style={styles.optionsContainer}>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(2, 0) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionTwoIndex(0);
              }}
            >
              <Image
                source={require("../../assets/choices/Cookie.png")}
              ></Image>
            </Pressable>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(2, 1) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionTwoIndex(1);
              }}
            >
              <Image
                source={require("../../assets/choices/CookieBitten.png")}
              ></Image>
            </Pressable>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(2, 2) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionTwoIndex(2);
              }}
            >
              <Image
                source={require("../../assets/choices/CookieCrumbs.png")}
              ></Image>
            </Pressable>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.text}>
            Select the battery that reflects your energy level.
          </Text>
          <View style={styles.optionsContainer}>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(3, 0) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionThreeIndex(0);
              }}
            >
              <Image
                source={require("../../assets/choices/batteryfull.png")}
              ></Image>
            </Pressable>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(3, 1) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionThreeIndex(1);
              }}
            >
              <Image
                source={require("../../assets/choices/batteryhalf.png")}
              ></Image>
            </Pressable>
            <Pressable
              style={() => [
                {
                  backgroundColor: checkSelected(3, 2) ? "#BDBDBD" : "white",
                },
                styles.option,
              ]}
              onPress={() => {
                setQuestionThreeIndex(2);
              }}
            >
              <Image
                source={require("../../assets/choices/batterylow.png")}
              ></Image>
            </Pressable>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.text}>
            What was your first thought this morning?
          </Text>
          <TextInput
            style={styles.textBoxContainer}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Your Aura Is...</Text>
                <View
                  style={{
                    width: 110,
                    height: 110,
                    backgroundColor: hexCode,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                ></View>
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("UserTab");
                  }}
                >
                  <Text style={styles.modalTextStyle}>Share My Daily Aura</Text>
                </Pressable>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalTextSmallStyle}>
                    Aura Looking Blue?
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.modalTextSmallStyle}>
                      Snap is always
                    </Text>
                    <Text style={styles.modalTextSmallStyle2}>
                      {" "}
                      Here For You
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              const userInput =
                selections.question1[questionOneIndex] +
                " " +
                selections.question2[questionTwoIndex] +
                " " +
                selections.question3[questionThreeIndex] +
                " " +
                text;
              console.log(userInput);
              fetchHexColor(userInput);
            }}
          >
            <Text style={styles.textStyle}>Get My Daily Aura</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 290,
    width: 250,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#0FADFF",
  },
  buttonClose: {
    backgroundColor: "#0FADFF",
  },
  modalTextContainer: {
    paddingVertical: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    // fontSize: 10,
  },
  modalTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  modalTextSmallStyle: {
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: 12,
  },
  modalTextSmallStyle2: {
    textAlign: "center",
    color: "#0FADFF",
    // fontWeight: "bold",
    fontSize: 12,
  },
  modalText: {
    fontFamily: "Avenir Next",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  questionContainer: {
    flex: 1,
    // backgroundColor: "pink",
    paddingHorizontal: 37,
    marginTop: 30,
    alignItems: "center",
  },
  question: {
    display: "flex",
    width: "315px",
    height: "20px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "14px",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 3 / 4,
    // backgroundColor: "red",
    flexDirection: "row",
  },
  headerLeft: {
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 4,
    // backgroundColor: "green",
    justifyContent: "center",
  },
  headerRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText1: {
    color: "#FFF",
    fontFamily: "Avenir Next",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20,
  },
  headerText2: {
    color: "#FFF",
    fontFamily: "Avenir Next",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    width: 100,
    height: 90,
    borderRadius: 50,
    margin: 15,
  },
  text: {
    color: "#FFF",
    fontFamily: "Avenir Next",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 20,
  },
  textBoxContainer: {
    height: 71,
    width: 315,
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
