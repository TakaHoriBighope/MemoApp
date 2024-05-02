import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LogOutButton = (): JSX.Element => {
  return (
    <TouchableOpacity>
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
