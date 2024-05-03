import { View, Text, ScrollView, StyleSheet } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../config";
import { type Memo } from "../../types/memo";
import { useState, useEffect } from "react";

const handlePress = (id: string): void => {
  router.push({ pathname: "/memo/Edit", params: { id } });
};

const Detail = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);
  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      const { bodyText, updatedAt } = memoDoc.data() as Memo;
      setMemo({
        id: memoDoc.id,
        bodyText,
        updatedAt,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo?.updatedAt?.toDate().toLocaleString("en-US")}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>{memo?.bodyText}</Text>
      </ScrollView>
      <FloatingButton
        onPress={() => {
          handlePress(id);
        }}
        style={{ top: 60, bottom: "auto" }}
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
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 86,
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "white",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "600",
  },
  memoDate: {
    color: "white",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});
export default Detail;
