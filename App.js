import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar  , TextInput, Pressable } from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import WeatherInfo from "./screens/WeatherInfo";
import { Provider as PaperProvider   } from "react-native-paper";
import {defaultTheme , darkTheme} from './Theme';
import MyPicker from './screens/MyPicker';
import NetInfo from "@react-native-community/netinfo";
import RefreshIcon from './screens/RefreshIcon';

const base_url = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = "b62a42fe6471ce47e9e440f66772578f";

export default function App() {
  const [errorMessage, setErrorMassage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading , setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [network , setNetwork] = useState(false);
  const [isDark , setIsDark] = useState(true);
  const [text , setText] = useState('');

  const [loaded] = useFonts({
    BYekan: require("./assets/fonts/BYekan.ttf"),
    IranSans: require("./assets/fonts/IRANSansMobile.ttf"),
  });
  useEffect(() => {

  }, [unit]);

  // network connection
  NetInfo.fetch().then(state => {
    setNetwork(state.isConnected);
  });

  const getSearch =async ()=>{
    const res = await axios.get(base_url+`q=${text}&appid=${api_key}`)
    console.log(res);
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
          <RefreshIcon load={load}/>
          <MyPicker unit={unit} setUnit={setUnit}/>
          <WeatherInfo currentweather={currentWeather} unit={unit} loading={loading}/>
        </View>
      </PaperProvider>
    );
  }

 

  // no data screen
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TextInput value={text} onChangeText={(t)=>setText(t)} placeholder="مکان مورد نظر را وارد کنید " style={styles.myinput}/>
      <Pressable onPress={getSearch} style={styles.press}><Text style={styles.text}>جستو جو </Text></Pressable>
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
  myinput : {
    fontFamily : 'IranSans',
    fontSize : 18,
    borderWidth : 1,
    borderColor : 'red',
    borderRadius : 10,
    padding : 10,
    textAlign :'center',
    margin : 10
  },
  press:{
    padding : 10,
    backgroundColor : 'red',
    borderRadius : 10,
    margin : 10,
    alignItems:'center'
  }
});
