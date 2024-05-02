import { View, StyleSheet } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import FloatingButton from "../../components/FloatingButton";
import { Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import LogOutButton from "../../components/LogOutButton";

const handlePress = (): void => {
  router.push("/memo/Create");
};

const Index = (): JSX.Element => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <MemoListItem />
      <MemoListItem />
      <MemoListItem />
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
export default Index;
