import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screensName } from "../../utils";
import {
  AccountScreen,
  ChangeEmailScreen,
  ChangeNameScreen,
  ChangePasswordScreen,
  ChangeUsernameScreen,
  OrderScreen,
  OrdersScreen,
  AddEditAddressesScreen,
  AddressesScreen,
} from "../../screens/Account";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#4E2C0B" },
        cardStyle: {
          backgroundColor: "#fff",
        },
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name={screensName.account.account}
        component={AccountScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={screensName.account.changeName}
        component={ChangeNameScreen}
        options={{ title: "Change Name and Lastname" }}
      />

      <Stack.Screen
        name={screensName.account.changeEmail}
        component={ChangeEmailScreen}
        options={{ title: "Change email" }}
      />

      <Stack.Screen
        name={screensName.account.changePassword}
        component={ChangePasswordScreen}
        options={{ title: "Change password" }}
      />

      <Stack.Screen
        name={screensName.account.changeUsername}
        component={ChangeUsernameScreen}
        options={{ title: "Change username" }}
      />

      <Stack.Screen
        name={screensName.account.order}
        component={OrderScreen}
        options={{ title: "", presentation: "modal" }}
      />

      <Stack.Screen
        name={screensName.account.orders}
        component={OrdersScreen}
        options={{ title: "Your Orders" }}
      />

      <Stack.Screen
        name={screensName.account.adresses}
        component={AddressesScreen}
        options={{ title: "Your adresses" }}
      />

      <Stack.Screen
        name={screensName.account.addEditAddress}
        component={AddEditAddressesScreen}
        options={{ title: "Your Orders" }}
      />
    </Stack.Navigator>
  );
}
