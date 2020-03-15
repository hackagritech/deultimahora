import React, {useRef, useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import {Container, Form, FormInput, SubmitButton} from './styles';

export default function Login() {
  // pass ref
  const passwordRef = useRef();

  // Navigation
  const navigation = useNavigation();

  // states
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // componendidmount
  useEffect(() => {
    let dbRef = database().ref('user');
    listenerFirebase(dbRef);
  }, []);

  function listenerFirebase(dbRef) {
    dbRef.on('value', dataSnapshot => {
      var feedbacks = [];

      dataSnapshot.forEach(child => {
        feedbacks.push({
          provider: child.val().provider,
          password: child.val().password,
          name: child.val().name,
          id: child.key,
        });
      });

      setUsers(feedbacks.reverse());
    });
  }

  async function handleSubmit() {
    if (name === '' || password === '') {
      Alert.alert('Alerta', 'Favor inserir valores validos');
      return;
    }
    let userApi = {};
    users.map(us => {
      if (us.name === name) {
        userApi = us;
      }
    });
    if (userApi.name === '') {
      Alert.alert('Alerta', 'Favor inserir um usuario valido');
      return;
    }
    if (userApi.password !== password) {
      Alert.alert('Alerta', 'A senha esta incorreta');
      return;
    }
    let caminho = '';
    if (userApi.provider) {
      caminho = 'HomeG';
    } else if (!userApi.provider) {
      caminho = 'HomeO';
    }
    setCurrentUser(userApi);
    navigation.replace(caminho, {
      user: userApi,
    });
  }

  return (
    <Container>
      <Form>
        <FormInput
          autoCorrect={false}
          icon="person"
          placeholder="Digite o seu nome de login"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <FormInput
          secureTextEntry
          icon="lock-outline"
          placeholder="Sua senha"
          value={password}
          onChangeText={setPassword}
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
      </Form>
    </Container>
  );
}
