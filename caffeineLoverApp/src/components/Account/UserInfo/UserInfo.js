import { View, Text } from "react-native";
import React from "react";
import { styles } from "./UserInfo.styles";
import { useAuth } from "../../../hooks";

export function UserInfo() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome,</Text>
      <Text style={styles.name}>
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.email}
      </Text>
    </View>
  );
}
