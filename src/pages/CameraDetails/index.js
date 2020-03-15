import React, {useState} from 'react';
import {Alert} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

import {Container, ContentCamera, InputText} from './styles';
import {Button, TextButton} from '../HomeG/styles';

export default function CameraDetails() {
  const [{cameraRef, autoFocusPoint}, {takePicture}] = useCamera();

  // Navigation
  const navigation = useNavigation();

  // state
  const [ocorrido, setOcorrido] = useState('');

  // params
  const route = useRoute();
  const {operation, user} = route.params;

  async function takePic() {
    if (ocorrido === '') {
      Alert.alert('Alerta', 'Relate o que ocorreu em escrito!');
      return;
    }
    const options = {quality: 0.5, base64: true};
    const data = await takePicture(options);
    console.tron.log(data.base64);

    let dbRefOp = database().ref(`operation/${operation.id}`);

    const dataSet = {
      img: `data:image/jpeg;base64,${data.base64}`,
      smg: ocorrido,
      status: 'ff0',
    };

    dbRefOp
      .update(dataSet)
      .then(data => {
        //success callback
        // console.tron.log('data ', data);
        navigation.replace('HomeO', {
          user,
        });
      })
      .catch(error => {
        //error callback
        console.tron.log('error ', error);
      });
  }
  return (
    <Container>
      <ContentCamera>
        <RNCamera
          style={{flex: 1}}
          ref={cameraRef}
          autoFocusPointOfInterest={autoFocusPoint.normalized}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      </ContentCamera>
      <InputText
        value={ocorrido}
        onChangeText={setOcorrido}
        placeholder="O que aconteceu?"
        placeholderTextColor="#888"
      />
      <Button
        style={{
          backgroundColor: '#159',
          marginHorizontal: 5,
          marginVertical: 5,
        }}
        onPress={takePic}>
        <TextButton>Relatar</TextButton>
      </Button>
    </Container>
  );
}
