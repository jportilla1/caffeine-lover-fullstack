import { ScrollView } from "react-native";
import { StatusBar } from "../components/Shared";

export function CartLayout(props) {
  const { children } = props;

  return (
    <>
      <StatusBar backgroundColor="#4E2C0B" barStyle="light-content" />
      <ScrollView>{children}</ScrollView>
    </>
  );
}
