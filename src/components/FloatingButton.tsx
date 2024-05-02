import {
  Text,
  StyleSheet,
  type ViewStyle,
  TouchableOpacity,
} from "react-native";

type Props = {
  children: JSX.Element;
  style?: ViewStyle;
  onPress?: () => void;
};

const FloatingButton = (props: Props): JSX.Element => {
  const { children, style, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.floatingButton, style]}>
      <Text style={styles.floatingButtonLabel}>{children}</Text>
    </TouchableOpacity>
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
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 5, height: 8 },
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
