import { View, StyleSheet, FlatList } from "react-native";
import { router, useNavigation } from "expo-router";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import MemoListItem from "../../components/MemoListItem";
import FloatingButton from "../../components/FloatingButton";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogOutButton";
import { auth, db } from "../../config";
import { type Memo } from "../../types/memo";

const handlePress = (): void => {
  router.replace("/memo/Create");
};

const List = (): JSX.Element => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt,
        });
      });
      setMemos(remoteMemos);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
      <FloatingButton onPress={handlePress}>
        <Feather name="plus" size={30} />
      </FloatingButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
export default List;
