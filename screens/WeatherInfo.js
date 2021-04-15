import React from "react";
import { View, Text, StyleSheet,ImageBackground ,  Image, ActivityIndicator } from "react-native";
import AnimateNumber from "react-native-countup";
import { useTheme } from "react-native-paper";




export default function WeatherInfo({ currentweather, loading  }) {
  const { colors } = useTheme();
  const {
    main: { temp , humidity   , pressure  },
    name,
    weather: [detail],
    wind,
    clouds : {all}
  } = currentweather;
  const { icon, description } = detail;
  const image = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  const imageb = 'https://media.nationalgeographic.org/assets/photos/000/263/26383.jpg'
  

  return (
    <ImageBackground
    source={{uri : imageb}}
      style={
        styles.container
      }
    >
    <View style={[styles.main]}>
      <Text style={[styles.text]}>{name}</Text>
      <Image style={styles.icon} source={{ uri: image }} />
      <Text style={[styles.caption]}>
        {description}
      </Text>
      {loading ? (
        <ActivityIndicator color="red" size="large"  />
      ) : (
        <AnimateNumber
          style={[styles.text, { color: "red", fontSize: 40 }]}
          value={temp}
          timing="linear"
          formatter={(val) => {
            return " " + parseFloat(val).toFixed(1) + "°";
          }}
        />
      )}
    </View>
    <View style={styles.box}>
          <View style={styles.boxView}>
            <Text style={styles.boxText}> <AnimateNumber value={wind.speed}
              formatter={(val)=>{return " " + parseFloat(val).toFixed(1)}}
            />m/s</Text>
            <Text style={styles.boxText}>سرعت وزش باد</Text>
          </View>
          <View style={styles.boxView}>
            <Text style={styles.boxText}> <AnimateNumber value={wind.deg}
              formatter={(val)=>{return " " + parseFloat(val).toFixed(1)+ "°"} }
            /></Text>
            <Text style={styles.boxText}>جهت وزش باد </Text>
          </View>
          <View style={styles.boxView}>
            <Text style={styles.boxText}> <AnimateNumber value={humidity}
              formatter={(val)=>{return " " + parseFloat(val).toFixed(1)+ " "} }
            />%</Text>
            <Text style={styles.boxText}>رطوبت هوا</Text>
          </View>
          <View style={styles.boxView}>
            <Text style={styles.boxText}> <AnimateNumber value={pressure }
              formatter={(val)=>{return " " + parseFloat(val).toFixed(1)+ " hpa"} }
            /></Text>
            <Text style={styles.boxText}>فشار هوا</Text>
          </View>
          <View style={[styles.boxView , {borderBottomWidth : 0}]}>
            <Text style={styles.boxText}> <AnimateNumber value={all}
              formatter={(val)=>{return " " + parseFloat(val).toFixed(1)+ " %"} }
            /></Text>
            <Text style={styles.boxText}>ابر ها </Text>
          </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container:{
    flex : 1
  },
  main: {
    flex: 1,
    // backgroundColor:'transparent',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "IranSans",
    fontSize: 25,
  },
  icon: {
    width: 150,
    height: 150,
  },
  caption: {
    fontFamily: "Iransans",
    marginBottom: 10,
    fontSize: 13,
    backgroundColor:'gold',
    padding : 10,
    borderRadius : 20,
   
  },
  box : {
    borderWidth : 1,
    borderColor : '#fff',
    margin : 10,
    padding : 12,
    borderRadius : 10,
    flex : 0.5,
    flexDirection : 'column',
    justifyContent : 'space-between',
  
  },
  boxView:{
    flexDirection : 'row',
    justifyContent :'space-between',
    padding : 10,
    borderBottomWidth : 1,
    borderBottomColor : '#fff',
    
  },
  boxText : {
    fontFamily : 'IranSans',
    color : 'gold',
    fontSize : 15
  }
});
