import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthScreen } from "../../screens/Auth";
import { screensName } from "../../utils";
import { HomeStack, CartStack, AccountStack } from "../stacks";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { styles } from "./TabNavigation.styles";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
        tabBarActiveTintColor: "#000",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={screensName.home.root}
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name={screensName.cart.root}
        component={CartStack}
        options={{ title: "Cart" }}
      />
      <Tab.Screen
        name={screensName.account.root}
        component={AccountStack}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}

function setIcon(route, routeStatus) {
  let iconName;
  let color = "#070707";

  if (routeStatus.focused) {
    color = "#FBF9F9";
  }

  switch (route.name) {
    case screensName.home.root:
      iconName = "home";
      break;
    case screensName.cart.root:
      iconName = "shopping-cart";
      break;
    case screensName.account.root:
      iconName = "user";
      break;
    default:
      iconName = "question";
  }

  return <AwesomeIcon name={iconName} color={color} style={styles.icon} />;
}
