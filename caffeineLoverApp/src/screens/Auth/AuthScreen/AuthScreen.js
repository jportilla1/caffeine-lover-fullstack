import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { LoginForm, RegisterForm } from "../../../components/Auth";
import { styles } from "./AuthScreen.styles";
import logo from "../../../../assets/LogoCaffeine-brown.png";

export function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);

  const OnShowLoginRegister = () => setShowLogin((prevState) => !prevState);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showLogin ? (
          <LoginForm showRegister={OnShowLoginRegister} />
        ) : (
          <RegisterForm showLogin={OnShowLoginRegister} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
