import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { type Info } from "../types/info";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config";

type Props = {
  info: Info;
};

const handlePress = (id: string): void => {
  if (auth.currentUser === null) {
    return;
  }
  const ref = doc(db, "infos", id);
  Alert.alert("Information deleted.", "Are you sure？", [
    {
      text: "Cancel",
    },
    {
      text: "deleted!",
      style: "destructive",
      onPress: () => {
        deleteDoc(ref).catch(() => {
          Alert.alert("failed");
        });
      },
    },
  ]);
};

const InfoListItem = (props: Props): JSX.Element | null => {
  const { info } = props;
  const { desc, createdAt, imgURL } = info;
  if (desc === null || createdAt === null) {
    return null;
  }
  const dateString = createdAt.toDate().toLocaleString("en-US");

  return (
    <Link href={{ pathname: "/info/Detail", params: { id: info.id } }} asChild>
      <TouchableOpacity style={styles.infoListItem}>
        <View style={styles.itemContainer}>
          {imgURL ? (
            <View style={styles.leftContainer}>
              <Image
                style={styles.imageContainer}
                source={{ uri: imgURL }}
                // contenFit="cover"
              />
            </View>
          ) : (
            ""
          )}
          <View style={styles.rightContainer}>
            <Text numberOfLines={3} style={styles.infoListItemTitle}>
              {desc}
            </Text>
            <Text style={styles.infoListItemDate}>{dateString}</Text>
            <View>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => {
                  handlePress(info.id);
                }}
              >
                <AntDesign name="delete" size={20} color="#676262" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
const styles = StyleSheet.create({
  infoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  infoListItemTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#322e2e",
  },
  infoListItemDate: {
    fontSize: 13,
    lineHeight: 13,
    color: "#676262",
    marginVertical: 15,
  },
  itemContainer: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    // marginVertical: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  deleteIcon: {
    position: "absolute",
    right: 5,
    bottom: 12,
    // paddingHorizontal: 1,
  },
});

export default InfoListItem;
