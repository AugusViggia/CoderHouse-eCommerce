import { StyleSheet, SafeAreaView } from "react-native";
// import Home from './src/screens/Home';
// import Search from './src/components/Search';
// import Products from './src/screens/Products';
// import { useFonts, Montserrat_300Light } from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { colors } from "./src/theme/colors";
import { fonts } from "./src/theme/fonts";
import { NavigationContainer } from "@react-navigation/native";
// import RootNavigation from './src/navigation/RootNavigation';
// import ProductDetail from './src/screens/ProductDetail';
// import TabNav from './src/navigation/TabNav';
// import AuthNav from './src/navigation/AuthNav';
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import MainNav from "./src/navigation/MainNav";

export default function App() {
  // const [monserratLoaded] = useFonts({ Montserrat_300Light });
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return;
  }

  return (
    <Provider store={store}>
      <MainNav />
      {/* <TabNav /> */}
      {/* <AuthNav/> */}
      {/* <RootNavigation>
        <Home /> 
        <Search />
        <Products />
        <ProductDetail />
      </RootNavigation> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    width: "100%",
    backgroundColor: colors.lightBlue,
  },
});
