import React, { Component } from 'react'
import { Text, StyleSheet, View, BackHandler, Dimensions, ToastAndroid } from 'react-native'
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CircleButton from './CircleButton';

const dimensions = Dimensions.get('window')

export default class CameraScreen extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,

    }

    takePicture = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            ToastAndroid.showWithGravity(
                'Photo saved.',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            await this.props.route.params.refresh()
        }
    }

    changeCameraType = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    handleBackPress = () => {
        this.props.route.params.refresh()
        this.props.navigation.goBack()
        console.log('back')
        return true;
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={styles.buttons}>
                            <CircleButton
                                onPress={this.changeCameraType}
                                icon={require('../assets/rotate-camera-icon.png')}
                            />
                            <CircleButton
                                onPress={this.takePicture}
                                icon={require('../assets/camera-icon.png')}
                            />
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: dimensions.height - 200
    }
})
