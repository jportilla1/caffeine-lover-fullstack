import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigation } from "./TabNavigation/TabNavigation";
import { screensName } from "../utils/screensName";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screensName.tab} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
