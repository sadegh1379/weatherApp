import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable , ImageBackground } from "react-native";
import { useTheme } from "react-native-paper";
import ALoading from "./Loading";

export default function SearchInput({ getSearch, loading ,errorMessage }) {
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const image = 'https://media.nationalgeographic.org/assets/photos/000/263/26383.jpg'

  const search = () => {
    if(text == '')
      return
    getSearch(text);
  };

  return (
    <ImageBackground
    source={{uri : image}}
      style={
        styles.container
      }
    >
        <View style={{ justifyContent: "center" , marginTop : 100}}>
        <TextInput
        value={text}
        onChangeText={(t) => setText(t)}
        placeholder="مکان مورد نظر را وارد کنید "
        style={styles.myinput}
      />
      <Pressable onPress={search} style={styles.press}>
        {
          errorMessage ? (<Text style={{fontFamily : 'IranSans' , color : 'red'}}>{errorMessage}</Text>) : 
          loading ? <ALoading /> : <Text style={styles.text}>جستو جو </Text>

        }
      </Pressable>
        </View>
     
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myinput: {
    fontFamily: "IranSans",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    margin: 10,
    color : '#fff'
  },
  press: {
    padding: 10,
    backgroundColor: "gold",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    
  },
  text: {
    fontFamily: "IranSans",
    fontSize: 13,
    color : '#fff'
  },
});
