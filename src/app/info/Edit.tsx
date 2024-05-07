import { Alert, View, TextInput, StyleSheet } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../config";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Info } from "../../types/info";

const handlePress = (id: string, info: Info): void => {
  if (auth.currentUser == null) {
    return;
  }
  const { desc, imgURL, likes, uid } = info;
  const ref = doc(db, "infos", id);
  setDoc(ref, {
    desc,
    imgURL,
    likes,
    uid,
    createdAt: Timestamp.fromDate(new Date()),
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
  // const [desc, setDesc] = useState("");
  const [info, setInfo] = useState<Info>({
    id: "",
    desc: "",
    createdAt: Timestamp.fromDate(new Date()),
    imgURL: "",
    likes: [],
    uid: "",
  });

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, "infos", id);
    getDoc(ref)
      .then((infoDoc) => {
        // setDesc(desc);
        const { desc, imgURL, uid, likes, createdAt } = infoDoc.data() as Info;
        setInfo({
          id: infoDoc.id,
          desc,
          imgURL,
          uid,
          likes,
          createdAt,
        });
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
          value={info?.desc}
          onChangeText={(text) => {
            // setDesc(text);
            setInfo({ ...info, desc: text });
          }}
          autoFocus
        />
      </View>
      <FloatingButton
        onPress={() => {
          handlePress(id, info);
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
