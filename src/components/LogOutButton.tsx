import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import { router } from "expo-router";

const handlePress = (): void => {
  signOut(auth)
    .then(() => {
      router.replace("/auth/Log_in");
    })
    .catch(() => {
      Alert.alert("Unabled Log Out!");
    });
};

const LogOutButton = (): JSX.Element => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.test}>Log out</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  test: {
    fontSize: 12,
    lineHeight: 24,
    color: "rgba(255,255,255,0.7)",
  },
});
export default LogOutButton;
