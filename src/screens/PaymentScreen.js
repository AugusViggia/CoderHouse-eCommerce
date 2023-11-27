import React from "react";
import { WebView } from "react-native-webview";

const PaymentScreen = ({ route }) => {
    const initPoint = route.params.initPoint;
    
    return <WebView source={{ uri: initPoint }} />;
};

export default PaymentScreen;
