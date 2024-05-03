import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { type Memo } from "../types/memo";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config";

type Props = {
  memo: Memo;
};

const handlePress = (id: string): void => {
  if (auth.currentUser === null) {
    return;
  }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  Alert.alert("メモを削除します", "よろしいですか？", [
    {
      text: "キャンセル",
    },
    {
      text: "削除する",
      style: "destructive",
      onPress: () => {
        deleteDoc(ref).catch(() => {
          Alert.alert("削除に失敗しました");
        });
      },
    },
  ]);
};

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props;
  const { bodyText, updatedAt } = memo;
  if (bodyText === null || updatedAt === null) {
    return null;
  }
  const dateString = updatedAt.toDate().toLocaleString("en-US");

  return (
    <Link href={{ pathname: "/memo/Detail", params: { id: memo.id } }} asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>
            {bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dateString}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => {
            handlePress(memo.id);
          }}
        >
          <AntDesign name="delete" size={20} color="#676262" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};
const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
    fontWeight: "600",
  },
  memoListItemDate: {
    fontSize: 13,
    lineHeight: 16,
    color: "#676262",
  },
  deleteIcon: {
    position: "absolute",
    right: 5,
    paddingHorizontal: 5,
  },
});

export default MemoListItem;
