import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { addressCtrl } from "../../../../api";
import { screensName } from "../../../../utils";
import { styles } from "./Address.styles";

export function Address(props) {
  const { addressId, address, onReload } = props;
  const navigation = useNavigation();

  // const goToUpdateAddress = () => {
  //   navigation.navigate(screensName.account.addEditAddress, {
  //     addressId,
  //   });
  // };

  const deleteAddressAlert = () => {
    Alert.alert(
      "Delete address",
      `Are you sure you want to delete the address?(${address.title})?`,
      [
        {
          text: "NO",
        },
        {
          text: "YES",
          onPress: deleteAddress,
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async () => {
    try {
      await addressCtrl.delete(address.documentId);
      onReload();
    } catch (error) {
      Toast.show("Error deleting address", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{address.title}</Text>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Text>
        {address.state}, {address.city}, {address.postal_code}
      </Text>
      <Text>{address.country}</Text>
      <Text>Phone Number: {address.phone}</Text>

      <View style={styles.actions}>
        {/* <Button mode="contained">Edit</Button> */}
        <Button mode="contained" onPress={deleteAddressAlert}>
          Delete
        </Button>
      </View>
    </View>
  );
}
