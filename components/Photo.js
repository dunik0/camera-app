import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Image, ToastAndroid } from 'react-native'
import * as MediaLibrary from "expo-media-library";
import * as Sharing from 'expo-sharing';
import MyButton from './MyButton'

export default class Photo extends Component {

    share = () => {
        const { data } = this.props.route.params
        Sharing.shareAsync(data.uri)
    }

    remove = async () => {
        const { data, refresh } = this.props.route.params
        await MediaLibrary.deleteAssetsAsync([data.id]);
        await refresh()
        ToastAndroid.showWithGravity(
            'Removed photo.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        this.props.navigation.navigate('Gallery')
    }

    render() {
        const { data } = this.props.route.params
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: data.uri }}
                />
                <View style={styles.row}>
                    <MyButton title='Share' onPress={this.share} />
                    <MyButton title='Remove' onPress={this.remove} />
                </View>
            </View>
        )
    }
}

const dimensions = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        borderRadius: 10,
        shadowColor: 'black',
        marginTop: 10,
        width: dimensions.width - 20,
        height: dimensions.height - 150
    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
        width: '100%',
        justifyContent: 'space-around'
    }
})
