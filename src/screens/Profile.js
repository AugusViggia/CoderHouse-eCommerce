import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import * as ImagePicker from "expo-image-picker";
import { usePutImageMutation } from "../services/eCommerceApi";
import { useGetImageQuery } from "../services/eCommerceApi";
import * as Location from "expo-location";
import { clearUser } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
    // 1- creo un estado local de imagen
    // const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    // Nos permite usar el metodo PUT en el componente y asi acceder a la DB
    const [putImage, result] = usePutImageMutation();
    // console.log(result);

    const { data, isLoading, error, refetch } = useGetImageQuery();
    // console.log(data);

    const defaultImage =
        "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg";

    // 2- copio la funcion de la documentacion: https://docs.expo.dev/versions/latest/sdk/imagepicker/
    // 3- La modifico dependiendo de mi proyecto (.All por video o imagen)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
            base64: true,
        });

        // console.log(result);

        // 4- Le agrego el encabezado a la imagen `data:image/jpg;base64,${cambio .uri por .base64}`
        if (!result.canceled) {
            // Actualizo como voy a setear la imagen por putImage en vez de setImage y luego lo paso como objeto image porque es como lo recibe la query
            await putImage({
                image: `data:image/jpg;base64,${result.assets[0].base64}`,
            });

            // quiero que vuelva a llamar a la query, para traer la mas actualizada y actualizarla
            refetch();
        }
    };

    // Creamos la funcion para abrir la camara y tomar una foto y actualizar actual con esa
    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Access to Camara denied");
            return;
        } else {
            const result = await ImagePicker.launchCameraAsync({
                base64: true,
            });

            // console.log(result);

            if (!result.canceled) {
                await putImage({
                    image: `data:image/jpg;base64,${result.assets[0].base64}`,
                });

                refetch();
            }
        }
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        navigation.navigate("mapLocation", { location });

        // console.log(JSON.stringify(location), null, " ");
    };

    // console.log("esta es la data.image", data.image);
    // console.log('imagen guardada en Base64', data);

    const handleLogOut = async () => {
        try {
            dispatch(clearUser());

            // aca borro el local/user storage con el metodo .removeItem()
            await AsyncStorage.removeItem("userEmail");
            navigation.navigate("rootNavigation");
        } catch (error) {
            console.log(error);
        }
    };

    const onLogOut = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to Log Out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Yes", onPress: () => handleLogOut() },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Profile" />
            {isLoading ? (
                <View style={styles.isLoading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: data ? data.image : defaultImage,
                            }}
                        />
                    </View>
                    <View style={styles.pressablesContainer}>
                        <Pressable onPress={() => openCamera()} style={styles.pressable}>
                            <Feather name="camera" size={24} color="black" />
                            <Text style={styles.text}>Take a photo</Text>
                        </Pressable>
                        <Pressable onPress={() => pickImage()} style={styles.pressable}>
                            <FontAwesome name="photo" size={24} color="black" />
                            <Text style={styles.text}>Choose a photo</Text>
                        </Pressable>
                        <Pressable onPress={() => getLocation()} style={styles.pressable}>
                            <Feather name="map" size={24} color="black" />
                            <Text style={styles.text}>Use location</Text>
                        </Pressable>
                        <Pressable onPress={() => onLogOut()} style={styles.pressable}>
                            <Entypo name="log-out" size={24} color="black" />
                            <Text style={styles.text}>Log Out</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.lightBlue,
        minHeight: "100%",
        minWidth: "100%",
    },
    image: {
        width: 230,
        height: 230,
        borderRadius: 100,
        marginTop: 70,
        borderColor: colors.navyBlue,
        borderWidth: 2,
    },
    pressablesContainer: {
        flexDirection: "column",
        gap: 15,
        marginTop: 80,
    },
    pressable: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 3,
        minWidth: 230,
    },
    isLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colors.darkNavy,
        fontSize: 17,
        fontFamily: "Montserrat",
    },
});