import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import MemoListItem from "../components/MemoListItem";
import FloatingButton from "../components/FloatingButton";

const Index = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <MemoListItem />
      <MemoListItem />
      <MemoListItem />
      <FloatingButton>+</FloatingButton>
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
