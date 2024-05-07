import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../config";
import { type Info } from "../../types/info";
import { useState, useEffect } from "react";

const handlePress = (id: string): void => {
  router.push({ pathname: "/info/Edit", params: { id } });
};

const Detail = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, "infos", id);
    const unsubscribe = onSnapshot(ref, (infoDoc) => {
      const { desc, imgURL, uid, likes, createdAt } = infoDoc.data() as Info;
      setInfo({
        id: infoDoc.id,
        desc,
        imgURL,
        uid,
        likes,
        createdAt,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <Text style={styles.infoTitle} numberOfLines={1}>
          {info?.desc}
        </Text>
        <Text style={styles.infoDate}>
          {info?.createdAt?.toDate().toLocaleString("en-US")}
        </Text>
      </View>
      <ScrollView style={styles.infoBody}>
        {info?.imgURL ? (
          <View style={styles.image}>
            <Image style={styles.image} source={{ uri: info?.imgURL }}></Image>
          </View>
        ) : null}
        <View>
          <Text style={styles.infoBodyText}>{info?.desc}</Text>
        </View>
      </ScrollView>
      <FloatingButton
        onPress={() => {
          handlePress(id);
        }}
        style={{ top: 35, bottom: "auto" }}
      >
        <Entypo name="edit" size={30} />
      </FloatingButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  infoHeader: {
    backgroundColor: "#467FD3",
    height: 70,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    paddingTop: 5,
  },
  infoTitle: {
    color: "white",
    fontSize: 16,
    lineHeight: 32,
    fontWeight: "600",
  },
  infoDate: {
    color: "white",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  infoBody: {
    paddingHorizontal: 27,
  },
  infoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});
export default Detail;
