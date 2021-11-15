import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native'

const dimensions = Dimensions.get('window')

export default class CircleButton extends Component {
    render() {
        const { onPress, icon, buttonStyle } = this.props
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{ ...buttonStyle, ...styles.button }}
            >
                <Image
                    source={icon}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: dimensions.width / 4,
        height: dimensions.width / 4,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: dimensions.width / 5,
        height: dimensions.width / 5,
    }
})
