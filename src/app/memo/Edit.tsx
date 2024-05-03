import { Alert, View, TextInput, StyleSheet } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../config";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser == null) {
    return;
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      router.back();
    })
    .catch((error) => {
      console.log(error);
    });
};

const Edit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [bodyText, setBodyText] = useState("");

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        const remoteBodyText = docRef?.data()?.bodyText;
        setBodyText(remoteBodyText);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("更新に失敗しました。");
      });
  }, []);

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
          handlePress(id, bodyText);
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
    flex: 1,
    paddingVertical: 22,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 27,
  },
});
export default Edit;
