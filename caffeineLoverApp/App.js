import { PaperProvider } from "react-native-paper";
import { RootNavigation } from "./src/navigation/RootNavigation";
import { AuthProvider, CartProvider } from "./src/contexts";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </CartProvider>
    </AuthProvider>
  );
}
