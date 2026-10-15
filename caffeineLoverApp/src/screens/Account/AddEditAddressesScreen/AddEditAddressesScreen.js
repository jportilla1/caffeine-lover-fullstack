import { useEffect } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { addressCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchema } from "./AddEditAddressesScreen.form";
import { styles } from "./AddEditAddressesScreen.styles";

export function AddEditAddressesScreen(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();
  const { user } = useAuth();
  const addressId = params?.addressId;

  useEffect(() => {
    if (addressId) {
      navigation.setOptions({ title: "Edit address" });
    } else {
      navigation.setOptions({ title: "New address" });
    }
  }, []);

  useEffect(() => {
    if (addressId) {
      retriveAddress();
    }
  }, [addressId]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          await addressCtrl.update(addressId, formValue);
        } else {
          await addressCtrl.create(user.id, formValue);
        }
        navigation.goBack();
      } catch (error) {
        Toast.show("Error ", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const retriveAddress = async () => {
    const response = await addressCtrl.get(addressId);
    await formik.setFieldValue("title", response.title);
    await formik.setFieldValue("name", response.name);
    await formik.setFieldValue("address", response.address);
    await formik.setFieldValue("postal_code", response.postal_code);
    await formik.setFieldValue("city", response.city);
    await formik.setFieldValue("state", response.state);
    await formik.setFieldValue("country", response.country);
    await formik.setFieldValue("phone", response.phone);
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <View style={styles.container}>
        <TextInput
          label="Title"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("title", text)}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <TextInput
          label="Name and Lastname"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("name", text)}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <TextInput
          label="Address"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <TextInput
          label="Postal Code"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("postal_code", text)}
          value={formik.values.postal_code}
          error={formik.errors.postal_code}
        />
        <TextInput
          label="City"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("city", text)}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <TextInput
          label="State"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("state", text)}
          value={formik.values.state}
          error={formik.errors.state}
        />
        <TextInput
          label="Country"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("country", text)}
          value={formik.values.country}
          error={formik.errors.country}
        />
        <TextInput
          label="Phone"
          style={globalStyles.form.input}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          value={formik.values.phone}
          error={formik.errors.phone}
        />

        <Button
          mode="contained"
          style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          {addressId ? "Update Address" : " New Address"}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
