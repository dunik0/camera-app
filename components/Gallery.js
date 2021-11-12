import React, { Component } from 'react'
import { Text, StyleSheet, View, ToastAndroid } from 'react-native'
import * as MediaLibrary from "expo-media-library";
import GalleryPhoto from './GalleryPhoto';

export default class Gallery extends Component {

    state = {
        photos: { assets: false }
    }

    async componentDidMount() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.showWithGravity(
                'Access to saved photos denied.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        } else {
            const photos = await MediaLibrary.getAssetsAsync({
                first: 100,
                mediaType: 'photo'
            })

            this.setState({ photos: photos.assets })

            alert(JSON.stringify(photos.assets, null, 4))
        }


    }

    render() {
        const { photos } = this.state

        const photoPreviews = photos.map?.(photo => (
            <GalleryPhoto data={photo} key={photo.id} />
        ))

        return (
            <View>
                <View></View>
                <View style={styles.photos}>
                    {photoPreviews}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    buttons: {

    },
    photos: {

    },

})
