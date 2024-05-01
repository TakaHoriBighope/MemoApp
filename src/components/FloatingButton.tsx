import { View, Text, StyleSheet } from "react-native";

type Props = {
  children: string;
};

const FloatingButton = (props: Props): JSX.Element => {
  const { children } = props;
  return (
    <View style={styles.floatingButton}>
      <Text style={styles.floatingButtonLabel}>{children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#467FD3",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 40,
    bottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  floatingButtonLabel: {
    color: "white",
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
  },
});

export default FloatingButton;
