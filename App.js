import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar  ,Alert } from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import WeatherInfo from "./screens/WeatherInfo";
import { Provider as PaperProvider   } from "react-native-paper";
import {defaultTheme , darkTheme} from './Theme';
import NetInfo from "@react-native-community/netinfo";
import TopHead from './screens/TopHead';
import SearchInput from "./screens/SearchInput";

const base_url = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = "b62a42fe6471ce47e9e440f66772578f";

export default function App() {
  const [errorMessage, setErrorMassage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading , setLoading] = useState(false);
  const [network , setNetwork] = useState(false);
  const [isDark , setIsDark] = useState(false);

  const [loaded] = useFonts({
    BYekan: require("./assets/fonts/BYekan.ttf"),
    IranSans: require("./assets/fonts/IRANSansMobile.ttf"),
  });

  // network connection
  NetInfo.fetch().then(state => {
    setNetwork(state.isConnected);
  });

  const getSearch =async (text)=>{
    setLoading(true)
    try {
      const res = await axios.get(base_url+`q=${text}&appid=${api_key}&units=metric&lang=fa`)
      console.log(res.data);
      setCurrentWeather(res.data)
    } catch (error) {
      //  Alert.alert( "جستوجو" , "مکان مورد  نظر پیدا نشد");
       setErrorMassage('مکان مورد نظر پیدا نشد ');
       setTimeout(()=>setErrorMassage(null) , 3000)
    }
    setLoading(false)
  }

  const clearWeather = ()=>{
    setCurrentWeather(null)
  }
  

  const myTheme = isDark ? darkTheme  : defaultTheme;

 

  // chek font set
  if (!loaded) {
    return (
      <View><Text>لطفا صبر کنید ...</Text></View>
    );
  }

   // network
   if(!network){
    return(
      <View style={[styles.container , {justifyContent:'center' , alignItems:'center'}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.text}>لطفا به اینترنت متصل شوید .</Text>
    </View>
    )
  }

  // main screen
  if (currentWeather) {
    return (
      <PaperProvider theme={myTheme}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <TopHead clearWeather={clearWeather}/>
          <WeatherInfo  currentweather={currentWeather} loading={loading}/>
        </View>
      </PaperProvider>
    );
  }

 

  // no data screen
  return (
    <PaperProvider theme={myTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
       <SearchInput errorMessage={errorMessage} getSearch={getSearch} loading={loading}/>
    </PaperProvider>
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
