import { ScrollView } from "react-native";
import { Search, StatusBar } from "../components/Shared";

export function HomeLayout(props) {
  const { children, hideSearch = false } = props;

  return (
    <>
      <StatusBar backgroundColor="#4E2C0B" barStyle="light-content" />

      <ScrollView>{children}</ScrollView>
    </>
  );
}
