import { LogBox } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { NativeBaseProvider, extendTheme } from "native-base";

//Context api
import Auth from "./Context/store/Auth";

//Navigators
import Main from "./Navigators/Main";

//Screens
import Header from "./Shared/Header";

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';


LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

const newColorTheme = {
  brand: {
    900: "#5B8DF6",
    800: "#ffffff",
    700: "#cccccc",
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});
