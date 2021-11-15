import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'

const dimensions = Dimensions.get('window')

export default class GalleryPhoto extends Component {

    navigateToPhoto = (data) => {
        const { refresh } = this.props
        this.props.navigation.navigate('Photo', { data, refresh })
    }

    render() {
        const { data, isGridOn, onLongPress, isSelected } = this.props
        console.log(data)
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => { this.navigateToPhoto(data) }}
                onLongPress={() => { onLongPress(data.id) }}
            >
                <View style={isSelected ? styles.imageContainer : false}>
                    {
                        isSelected
                            ?
                            <Image
                                style={styles.checkMark}
                                source={require('../assets/check-mark.png')}
                            />
                            : false
                    }
                    <Image
                        style={isGridOn ? styles.previewGrid : styles.previewList}
                        source={{ uri: data.uri }}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    previewGrid: {
        width: dimensions.width / 3,
        height: dimensions.width / 3,
    },
    previewList: {
        borderRadius: 10,
        margin: 2,
        marginHorizontal: 4,
        width: dimensions.width - 8,
        height: dimensions.width / 3,
    },
    imageContainer: {
        opacity: 0.6,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkMark: {
        position: 'absolute',
        width: dimensions.width / 4,
        height: dimensions.width / 4,
    },
})
