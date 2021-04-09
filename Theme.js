import {DarkTheme, DefaultTheme} from 'react-native-paper';

export const defaultTheme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        text : '#333',
        background : '#fff'
    }
   
}
export const darkTheme = {
    ...DarkTheme,
    colors : {
        ...DarkTheme.colors,
        text : '#fff',
        background : '#333'
    }
   
}