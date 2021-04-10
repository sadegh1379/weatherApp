import React from 'react'
import { View, Text , StyleSheet , Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';


export default function MyPicker({unit , setUnit}) {
    return (
        <View style={styles.pickerstyle}>
             <RNPickerSelect
             
             style={pickerSelectStyles}
             InputAccessoryView={() => null}
             placeholder={{}}
             value={unit}
            items={[
                {
                    label :'F°',
                    value : 'imperial'
                },
                {
                    label : 'C°',
                    value:'metric'
                }
            ]}
            onValueChange={value => {
              setUnit(value)
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerstyle:{   
        width : 100,
        height : 100,
        ...Platform.select({
            ios:{
                top : -30
            },
            android : {
                top : 60
            },
            web:{
                top : 60
            }
        }),
        position : 'absolute',
        zIndex : 2,
        left : 20
        
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
