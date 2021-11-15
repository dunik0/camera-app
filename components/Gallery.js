import React, { Component } from 'react'
import { Text, StyleSheet, View, ToastAndroid, ActivityIndicator, FlatList } from 'react-native'
import * as MediaLibrary from "expo-media-library";
import GalleryPhoto from './GalleryPhoto';
import MyButton from './MyButton';

export default class Gallery extends Component {

    state = {
        loading: false,
        photos: { assets: false },
        isGridOn: true,
        selected: []
    }

    refreshPhotos = async () => {
        const photos = await MediaLibrary.getAssetsAsync({
            first: 150,
            sortBy: MediaLibrary.SortBy.modificationTime,
            mediaType: 'photo'
        })

        this.setState({
            photos: photos.assets,
        })
    }

    toggleView = () => {
        this.setState(prevState => ({
            isGridOn: !prevState.isGridOn
        }))
    }

    navigateToCamera = () => {
        this.props.navigation.navigate('Camera', { refresh: this.refreshPhotos })
    }

    removeSelected = async () => {
        await MediaLibrary.deleteAssetsAsync(this.state.selected);
        await this.refreshPhotos()
        const message = this.state.selected[0] ? 'Removed selected photos.' : 'No photos selected'
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    select = (id) => {
        const selected = [...this.state.selected]
        if (selected.includes(id)) {
            const index = selected.indexOf(id)
            selected.splice(index, 1)
        }
        else {
            selected.push(id)
        }
        this.setState({ selected })
        console.log(selected)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.showWithGravity(
                'Access to saved photos denied.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        } else {
            await this.refreshPhotos()
            this.setState({ loading: false })
        }


    }

    render() {
        const { photos, loading, isGridOn, selected } = this.state

        return (
            <View>
                <View style={styles.row}>
                    <MyButton
                        title='Grid/List'
                        onPress={this.toggleView}
                    />
                    <MyButton
                        title='Camera'
                        onPress={this.navigateToCamera}
                    />
                    <MyButton
                        title='Remove'
                        onPress={this.removeSelected}
                    />
                </View>
                <View>
                    {
                        loading
                            ?
                            <ActivityIndicator size="large" color="#000000" />
                            :
                            <FlatList
                                style={styles.photos}
                                data={photos}
                                keyExtractor={photo => photo.id}
                                numColumns={isGridOn ? 3 : 1}
                                renderItem={photo => (
                                    <GalleryPhoto
                                        data={photo.item}
                                        isGridOn={isGridOn}
                                        navigation={this.props.navigation}
                                        isSelected={selected.includes(photo.item.id)}
                                        onLongPress={this.select}
                                        refresh={this.refreshPhotos}
                                    />
                                )}
                                key={isGridOn ? 1 : 0}
                            />

                    }
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
        marginBottom: 80
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

})
