import { View, TextInput, StyleSheet } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../config";
import { useState } from "react";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";

const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) {
    return;
  }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
  addDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then((docRef) => {
      router.replace("/memo/List");
    })
    .catch((error) => {
      console.log(error);
    });
};

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          autoFocus
        />
      </View>
      <FloatingButton
        onPress={() => {
          handlePress(bodyText);
        }}
      >
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
export default Create;
