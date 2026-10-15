import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { styles } from "./Payment.styles";
import { globalStyles } from "../../../styles";
import { useAuth, useCart } from "../../../hooks";
import { initialValues, validationSchema } from "./Payment.form";
import Toast from "react-native-root-toast";
import { orderCtrl } from "../../../api";
import { ENV, screensName } from "../../../utils";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

const stripe = require("stripe-client")(ENV.STRIPE.PUBLISHEBLE_KEY);

export function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const { user } = useAuth();
  const { emptyCart } = useCart();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const result = await stripe.createToken({ card: formValue });
        if (result?.error) {
          Toast.show(result.error.message, {
            position: Toast.positions.CENTER,
          });
        } else {
          const response = await orderCtrl.payment(
            result.id,
            user.id,
            products,
            selectedAddress
          );

          if (size(response) > 0) {
            Toast.show("Payment successful", {
              position: Toast.positions.CENTER,
              duration: Toast.durations.SHORT,
            });

            await emptyCart();

            setTimeout(() => {
              navigation.navigate(screensName.account.root, {
                screen: screensName.account.orders,
              });
            }, 2000);
          } else {
            new Error("Error when placing the order");
          }
        }
      } catch (error) {
        Toast.show("Error when placing the order", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Method of payment</Text>
      <TextInput
        label="Name of the holder"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Card number"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />

      <View style={styles.inputGroup}>
        <View style={styles.viewMonthYearInputs}>
          <TextInput
            label="Month"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label="Year"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Pay {totalPayment && `($ ${totalPayment.toFixed(2)})`}
      </Button>
    </View>
  );
}
