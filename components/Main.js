import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class Main extends Component {

    navigateToGallery = () => {
        this.props.navigation.navigate('Gallery')
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.navigateToGallery}
            >
                <Text style={styles.title}> CumApp </Text>
                <Text style={styles.text}>Click to open gallery</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {

    },
    text: {

    }
})
