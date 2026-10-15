import { Formik } from "formik";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { initialValues, validationSchema } from "./LoginForm.form";
import { authCtrl } from "../../../api";
import { useAuth } from "../../../hooks";

export function LoginForm(props) {
  const { showRegister } = props;
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { email, password } = formValue;

        const response = await authCtrl.login(email, password);

        // Si el usuario está confirmado, realizar login
        login(response.jwt);
      } catch (error) {
        // Manejar errores según su tipo
        if (error.status === 403) {
          Toast.show(error.message, {
            position: Toast.positions.CENTER,
            duration: Toast.durations.LONG,
          });
        } else if (error.status === 400 || error.status === 401) {
          Toast.show("The username or password is not valid", {
            position: Toast.positions.CENTER,
          });
        } else {
          Toast.show(error.message || "An unexpected error occurred.", {
            position: Toast.positions.CENTER,
          });
        }
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Email"
        style={globalStyles.form.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <TextInput
        label="Password"
        style={globalStyles.form.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Log in
      </Button>

      <Button
        mode="text"
        style={globalStyles.form.btnText}
        labelStyle={globalStyles.form.btnTextLabel}
        onPress={showRegister}
      >
        Sign in
      </Button>
    </View>
  );
}
