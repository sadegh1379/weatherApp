import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import AnimateNumber from "react-native-countup";
import { useTheme } from "react-native-paper";




export default function WeatherInfo({ currentweather, unit, loading }) {
  const { colors } = useTheme();
  const {
    main: { temp },
    name,
    weather: [detail],
  } = currentweather;
  const { icon, description } = detail;
  const image = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  // console.log(detail)

  return (
    <View style={[styles.main, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>{name}</Text>
      <Image style={styles.icon} source={{ uri: image }} />
      <Text style={[styles.caption, { color: colors.text }]}>
        {description}
      </Text>
      {loading ? (
        <ActivityIndicator color="red" size="large"  />
      ) : (
        <AnimateNumber
          style={[styles.text, { color: "red", fontSize: 40 }]}
          value={temp}
          timing="easeOut"
          formatter={(val) => {
            return "" + parseFloat(val).toFixed(1) + "°";
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    opacity: 0.8,
    marginBottom: 10,
    fontSize: 8,
  },
});
