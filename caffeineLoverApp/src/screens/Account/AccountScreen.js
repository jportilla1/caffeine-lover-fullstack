import { Text } from "react-native";
import React from "react";
import { Layout } from "../../layouts";
import { UserInfo, Menu } from "../../components/Account";

export function AccountScreen() {
  return (
    <Layout.Basic>
      <UserInfo />
      <Menu />
    </Layout.Basic>
  );
}
