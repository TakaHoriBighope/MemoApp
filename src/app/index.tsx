import { View, Text, StyleSheet } from "react-native";

const Index = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Memo App</Text>
          <Text>Log out</Text>
        </View>
      </View>
      <View>
        <View>
          <View>
            <Text>買い物リスト</Text>
            <Text>2024年5月1日　10：00</Text>
          </View>
          <View>
            <Text>x</Text>
          </View>
        </View>

        <View>
          <View>
            <Text>買い物リスト</Text>
            <Text>2024年5月1日　10：00</Text>
          </View>
          <View>
            <Text>x</Text>
          </View>
        </View>

        <View>
          <View>
            <Text>買い物リスト</Text>
            <Text>2024年5月1日　10：00</Text>
          </View>
          <View>
            <Text>x</Text>
          </View>
        </View>
      </View>
      <View>
        <Text>+</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Index;
