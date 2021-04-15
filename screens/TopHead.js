import React from 'react'
import { View, Text , StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';

export default function TopHead({clearWeather}) {
    const {colors} = useTheme()

    const loadPage = ()=>{
        alert('load');
        
    }
    const back = ()=>{
        clearWeather();
    }
    return (
        <View style={styles.icon}>
            {/* <FontAwesome color="#fff" onPress={loadPage} name="refresh" size={24}  /> */}
            <FontAwesome color="#fff" onPress={back}  name="arrow-left" size={20} />
        </View>
    )
}
const styles = StyleSheet.create({
    icon:{
       position:'absolute',
       zIndex : 1,
       padding : 15
    }
})
