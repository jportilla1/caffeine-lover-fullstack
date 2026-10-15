import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  ProductScreen,
  SearchScreen,
  CoffeeShops,
  Game,
  Store,
  Tutorials,
} from "../../screens/Home";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screensName.home.home} component={HomeScreen} />
      <Stack.Screen name={screensName.home.product} component={ProductScreen} />
      <Stack.Screen name={screensName.home.search} component={SearchScreen} />
      <Stack.Screen
        name={screensName.home.coffeeShops}
        component={CoffeeShops}
      />
      <Stack.Screen name={screensName.home.game} component={Game} />
      <Stack.Screen name={screensName.home.store} component={Store} />
      <Stack.Screen name={screensName.home.tutorials} component={Tutorials} />
    </Stack.Navigator>
  );
}
