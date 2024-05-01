import { View, Text, StyleSheet, type TextStyle } from "react-native";

type Props = {
  children: string;
  bang?: boolean;
  style?: TextStyle;
};

export const Hello = (props: Props): JSX.Element => {
  const { children, bang, style } = props;
  return (
    <View>
      <Text style={[styles.text, style]}>
        Hello {children}
        {bang === true ? " !!" : null}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    backgroundColor: "blue",
    fontSize: 40,
    fontWeight: "bold",
    padding: 16,
  },
});
