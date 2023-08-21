import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import db from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const getUserData = async (userAuthObj) => {
    // get Doc from User collection
    const docRef = doc(db, "Users", userAuthObj.uid);
    const userData = await getDoc(docRef).catch((error) => {
      console.log("error getting userData", error);
    });
    if (userData.exists()) {
      setUserData(userData.data());
    } else {
      console.log("Error getting user data, setting to dummy obj");
      setUserData({ name: "No username found" });
    }
  };

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);

          getUserData(user);
        } else {
          // User is signed out
          setUser(undefined);
        }
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    userData,
  };
}
