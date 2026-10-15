import { Alert } from "react-native";
import React from "react";
import { styles } from "./Menu.styles";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { accountMenu, appMenu } from "./Menu.data";
import { useAuth } from "../../../hooks";

export function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const alertLogout = () => {
    Alert.alert(
      "Close Session",
      "Are you sure you want to log out?",
      [{ text: "NO" }, { text: "YES", onPress: async () => await logout() }],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>My account</List.Subheader>
        {map(accountMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            left={(props) => <List.Icon {...props} icon={item.leftIcon} />}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Subheader>App</List.Subheader>
        {map(appMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            left={(props) => <List.Icon {...props} icon={item.leftIcon} />}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Item
          title="Close Session"
          titleStyle={styles.titleLogoutItem}
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={alertLogout}
        />
      </List.Section>
    </>
  );
}
