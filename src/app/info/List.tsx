import { View, StyleSheet, FlatList } from "react-native";
import { router, useNavigation } from "expo-router";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import InfoListItem from "../../components/InfoListItem";
import FloatingButton from "../../components/FloatingButton";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogOutButton";
import { auth, db } from "../../config";
import { type Info } from "../../types/info";

const handlePress = (): void => {
  router.push("/info/Create");
  // router.replace("/info/Create");
};

const List = (): JSX.Element => {
  const navigation = useNavigation();
  const [infos, setInfos] = useState<Info[]>([]);

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
    const ref = collection(db, "infos");
    const q = query(ref, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteInfos: Info[] = [];
      snapshot.forEach((doc) => {
        const { desc, imgURL, uid, likes, createdAt } = doc.data();
        remoteInfos.push({
          id: doc.id,
          desc,
          imgURL,
          uid,
          likes,
          createdAt,
        });
      });
      setInfos(remoteInfos);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={infos}
        renderItem={({ item }) => <InfoListItem info={item} />}
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
