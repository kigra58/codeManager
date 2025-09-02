import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={{ padding: 10, backgroundColor: "#fff", borderRadius: 8 }}>
      <Text style={{ fontWeight: "bold", color: "#0d6efd" }}>
        Time Remaining: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
}
