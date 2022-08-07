import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Box = (props) => {
    return(
        <TouchableOpacity style={[styles.box,{backgroundColor: props.change ? "#FFFFFF" : "#05445E"}]} onPress={props.press}>
            <Text style={{fontSize: 48}}>
                {props.text}
            </Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    box: {
        width: 98,
        height: 91,
        fontSize: 48,
        alignItems: "center",
        backgroundColor: "#05445E",
        borderWidth: 1,
        borderColor: "white",
        justifyContent: "center"
    },
})

export default Box