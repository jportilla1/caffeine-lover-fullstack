import { screensName } from "../../../utils";
export const accountMenu = [
  {
    title: "Change name and last name",
    description: "Change account name",
    leftIcon: "emoticon-excited-outline",
    screen: screensName.account.changeName,
  },
  {
    title: "Change the email",
    description: "Change your email",
    leftIcon: "at",
    screen: screensName.account.changeEmail,
  },
  // {
  //   title: "Change the username",
  //   description: "Change your username",
  //   leftIcon: "card-account-details-outline",
  //   screen: screensName.account.changeUsername,
  // },
  {
    title: "Change the password",
    description: "Change your password",
    leftIcon: "key-outline",
    screen: screensName.account.changePassword,
  },
];

export const appMenu = [
  {
    title: "Cart",
    description: "List of all orders",
    leftIcon: "order-bool-descending-variant",
    screen: screensName.account.orders,
  },
  {
    title: "My addresses",
    description: "Manage your addresses",
    leftIcon: "map-marker-outline",
    screen: screensName.account.adresses,
  },
];
