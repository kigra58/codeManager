import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFormContext } from "../contexts/FormContext";
import { theme } from "../theme/theme";

export default function Timer() {
  const { timeLeft } = useFormContext();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Time Remaining: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.light,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
  }
});
