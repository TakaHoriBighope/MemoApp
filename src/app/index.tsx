import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { useEffect } from "react";

const Index = (): JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace("/info/List");
      }
    });
  }, []);
  return <Redirect href="auth/Log_in" />;
};
export default Index;
