import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class GalleryPhoto extends Component {
    render() {
        return (
            <View style={styles.preview}>
                <Text>{this.props.data.id}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    preview: {

    }
})
