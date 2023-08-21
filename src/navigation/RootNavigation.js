import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

export default function RootNavigation() {
  const { user } = useAuthentication();
  const auth = getAuth();

  if (!user && process.env.EXPO_PUBLIC_ENVIRONMENT == "dev") {
    devAutoLogin(auth);
  }

  return user ? <UserStack /> : <AuthStack />;
}

async function devAutoLogin(auth) {
  console.log("Developer environment, signing in automatically");

  // Only works if you make a file called ".env" with contents:
  // EXPO_PUBLIC_ENVIRONMENT=dev
  // EXPO_PUBLIC_DEV_EMAIL=youremail
  // EXPO_PUBLIC_DEV_PASSWORD=yourpassword

  await signInWithEmailAndPassword(
    auth,
    process.env.EXPO_PUBLIC_DEV_EMAIL,
    process.env.EXPO_PUBLIC_DEV_PASSWORD
  )
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
