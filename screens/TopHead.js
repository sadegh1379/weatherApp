import React from 'react'
import { View, Text , StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {useTheme} from 'react-native-paper';

export default function TopHead() {
    const {colors} = useTheme()

    const loadPage = ()=>{
        alert('load');
        
    }
    return (
        <View style={styles.icon}>
            <FontAwesome onPress={loadPage} name="refresh" size={24} color={colors.text} />
            <FontAwesome  name="arrow-left" size={24} color={colors.text} />
        </View>
    )
}
const styles = StyleSheet.create({
    icon:{
        position : 'absolute',
        zIndex : 2,
        top : 10,
        right : 20,
        
    }
})