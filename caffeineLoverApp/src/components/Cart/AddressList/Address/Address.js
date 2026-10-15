import { View, Text, Pressable } from "react-native";
import { styles } from "./Address.styles";

export function Address(props) {
  const { address, selectedAddress, setSelectedAddress } = props;

  const stylesSelected = address.id === selectedAddress?.id && styles.checked;

  return (
    <Pressable onPress={() => setSelectedAddress(address)}>
      <View style={[styles.container, stylesSelected]}>
        <Text style={styles.title}>{address.title}</Text>
        <Text>{address.name}</Text>
        <Text>{address.address}</Text>
        <Text>
          {address.state}, {address.city}, {address.postal_code}
        </Text>
        <Text>{address.country}</Text>
        <Text>Phone Number:{address.phone}</Text>
      </View>
    </Pressable>
  );
}
