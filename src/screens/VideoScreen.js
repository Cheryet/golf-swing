import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CameraPermissionStatus} from 'react-native-vision-camera';

const VideoScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setRecording(true);
        const video = await cameraRef.current.startRecording({
          fileType: 'mp4',
          onRecordingFinished: video => {
            console.log('Video saved to:', video.path);
            Alert.alert('Recording Finished', `Video saved to: ${video.path}`);
            setRecording(false);
          },
          onRecordingError: error => {
            console.error(error);
            Alert.alert('Recording Error', error.message);
            setRecording(false);
          },
        });
      } catch (error) {
        console.error('Error starting recording:', error);
        Alert.alert('Error', error.message);
        setRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
      setRecording(false);
    }
  };

  if (!cameraPermissionStatus && !device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permissions are required to use this feature.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={cameraRef}
        video={true}
      />

      {/* Record Button */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.recordButton, recording && styles.recording]}
          onPress={recording ? stopRecording : startRecording}>
          <Icon
            name={recording ? 'stop' : 'play-arrow'}
            size={30}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  permissionText: {
    color: 'white',
    textAlign: 'center',
    padding: 100,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    backgroundColor: 'darkred',
  },
});
