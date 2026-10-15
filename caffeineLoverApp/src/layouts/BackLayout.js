import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Search, StatusBar } from "../components/Shared";

export function BackLayout(props) {
  const { children, hideSearch = false } = props;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor="#4E2C0B" barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>{children}</ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4E2C0B",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
