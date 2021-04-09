import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios'

const base_url = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = 'b62a42fe6471ce47e9e440f66772578f'

export default function App() {
  const [errorMessage ,setErrorMassage] = useState(null)
  const [currentWeather , setCurrentWeather] = useState(null);
  useEffect(()=>{
    load();
  } , [])

  const load = async()=>{
    try {
      let {status} = await Location.requestPermissionsAsync();
      if(status !== 'granted'){
        setErrorMassage('برای اجرای برنامه به مکان شما نیاز داریم');
        return
      }
      const location = await Location.getCurrentPositionAsync();
      const {latitude , longitude} = location.coords;
      console.log(latitude , " , " , longitude )
      // const res = await fetch(`${base_url}lat=${latitude}&lon=${longitude}&appid=${api_key}`);
      const res = await axios.get(`${base_url}lat=${latitude}&lon=${longitude}&appid=${api_key}`);
     
      console.log(res)
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
