import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { userCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchema } from "./ChangeNameScreen.form";
import { styles } from "./ChangeNameScreen.styles";

export function ChangeNameScreen() {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(user.firstName, user.lastName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateUser(user.id, formValue);
        updateUser("firstName", formValue.firstName);
        updateUser("lastName", formValue.lastName);
        navigation.goBack();
      } catch (error) {
        Toast.show("Error updating data", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("firstName", text)}
        value={formik.values.firstName}
        error={formik.errors.firstName}
      />
      <TextInput
        label="Last Name"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("lastName", text)}
        value={formik.values.lastName}
        error={formik.errors.lastName}
      />
      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Change name and lastname
      </Button>
    </View>
  );
}
