import { View, TextInput, StyleSheet, Image, Alert } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { db, auth, createInfoRef } from "../../config";
import { useState } from "react";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import { Info } from "../../types/info";
import { pickImage } from "../../image-picker";
import { IconButton } from "../../components/IconButton";
import { getExtension } from "../../utils/files";

const handlePress = async (info: Info) => {
  if (auth.currentUser === null) {
    return;
  }
  const { desc, imgURL, uid, likes } = info;

  if (!desc) {
    Alert.alert("レビューまたは画像がありません。");
    return;
  }
  if (imgURL) {
    //document-IDを先に取得
    const infoDocRef = await createInfoRef(info.id);
    // storageのpathを決定
    const ext = getExtension(imgURL);
    const storagePath = `image/${infoDocRef.id}.${ext}`;
    //infoドキュメントを作る
    const localUri = await fetch(imgURL);
    const blob = await localUri.blob();
    //storageにupload ref
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);
    //画像をstorageにアップロード
    const uploadImage = uploadBytesResumable(storageRef, blob);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.log(err);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const ref = collection(db, "infos");
          addDoc(ref, {
            desc,
            imgURL: downloadURL,
            uid: auth.currentUser?.uid,
            likes,
            createdAt: Timestamp.fromDate(new Date()),
          })
            .then((docRef) => {
              router.replace("/info/List");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    );
  } else {
    const ref = collection(db, "infos");
    addDoc(ref, {
      desc,
      imgURL,
      uid: auth.currentUser.uid,
      likes,
      createdAt: Timestamp.fromDate(new Date()),
    })
      .then((docRef) => {
        router.replace("/info/List");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const Create = (): JSX.Element => {
  const [info, setInfo] = useState<Info>({
    id: "",
    desc: "",
    createdAt: Timestamp.fromDate(new Date()),
    imgURL: "",
    likes: [],
    uid: "",
  });
  const [imageURL, setImageURL] = useState<string>("");

  const onPickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImageURL(uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.photoContainer}>
          <IconButton name="camera" onPress={onPickImage} color="#ccc" />
          {!!imageURL && (
            <Image source={{ uri: imageURL }} style={styles.image} />
          )}
        </View>
        <TextInput
          multiline
          style={styles.input}
          value={info.desc}
          onChangeText={(text) => {
            // setDesc(text);
            setInfo({ ...info, desc: text, imgURL: imageURL });
          }}
          autoFocus
        />
      </View>
      <FloatingButton
        onPress={() => {
          handlePress(info);
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
  photoContainer: {
    marginLeft: 2,
  },
  image: {
    width: "100%",
    height: 200,
    margin: 1,
    resizeMode: "cover",
  },
});
export default Create;
