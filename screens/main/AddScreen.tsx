import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export interface AddScreen {
  navigation: any;
}

const AddScreen: React.FC<AddScreen> = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState<any>();
  const [image, setImage] = useState<any>();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.fixedRatio}
          ratio={'1:1'}
          type={type}
          ref={(ref) => setCamera(ref)}
        />
      </View>
      <Button title="Flip Camera" onPress={toggleCameraType} />
      <Button title="Take Pic" onPress={() => takePicture()} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button
        title="Save"
        onPress={() => navigation.navigate('Save', { image })}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 1,
    height: 10,
  },
});
