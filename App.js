import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { useFonts } from "expo-font";
import WeatherInfo from "./screens/WeatherInfo";
import { Provider as PaperProvider  , DarkTheme } from "react-native-paper";
import {defaultTheme , darkTheme} from './Theme';

const base_url = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = "b62a42fe6471ce47e9e440f66772578f";

export default function App() {
  const [errorMessage, setErrorMassage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [isDark , setIsDark] = useState(false);

  const [loaded] = useFonts({
    BYekan: require("./assets/fonts/BYekan.ttf"),
    IranSans: require("./assets/fonts/IRANSansMobile.ttf"),
  });
  useEffect(() => {
    load();
  }, []);

  const myTheme = isDark ? darkTheme  : defaultTheme;

  const load = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMassage("برای اجرای برنامه به مکان شما نیاز داریم");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const res = await axios.get(
        `${base_url}lat=${latitude}&lon=${longitude}&units=${unit}&appid=${api_key}&lang=fa`
      );
      if (res.status == 200) {
        setCurrentWeather(res.data);
        console.log(res.data);
      }

      setErrorMassage("مشکلی پیش آمده لطفا بعدا تلاش کنید ");
    } catch (error) {
      setErrorMassage("مشکلی پیش آمده لطفا بعدا تلاش کنید ");
    }
  };

  // chek font set
  if (!loaded) {
    return null;
  }

  // main screen
  if (currentWeather) {
    return (
      <PaperProvider theme={myTheme}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <WeatherInfo currentweather={currentWeather} />
        </View>
      </PaperProvider>
    );
  }

  // no data screen
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "IranSans",
  },
});
