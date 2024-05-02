import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const handlePress = (): void => {
  // router.push("/memo/Detail");
  router.back();
};

const Edit = (): JSX.Element => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.textContainer}>
        <TextInput multiline style={styles.input} value={`買い物\nリスト`} />
      </View>
      <FloatingButton onPress={handlePress}>
        <FontAwesome6 name="check" size={24} color="white" />
      </FloatingButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});
export default Edit;
