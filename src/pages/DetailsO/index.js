import React from 'react';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {
  Button,
  TextButton,
  TextTipo,
  TextOperador,
  TextCultura,
  TextTalhao,
  TextMaquina,
} from '../HomeG/styles';

import {Container, Wrapper, ButtonView, ContentText} from './styles';

export default function DetailsO() {
  const route = useRoute();
  const {operation, user} = route.params;

  // Navigation
  const navigation = useNavigation();

  // finalizando operação
  function finalizarOperacao() {
    let dbRefOp = database().ref(`operation/${operation.id}`);

    dbRefOp
      .update({status: '0f0'})
      .then(data => {
        //success callback
        console.tron.log('data ', data);
        navigation.goBack();
      })
      .catch(error => {
        //error callback
        console.tron.log('error ', error);
      });
  }

  // novavigate to Problem Detais
  function setProblme() {
    navigation.navigate('CDetails', {
      operation,
      user,
    });
  }

  return (
    <Container>
      <Wrapper>
        <ContentText>
          <TextCultura>Cultura de {operation.cultura}</TextCultura>
          <TextTalhao>Talhão: {operation.talhao}</TextTalhao>
          <TextTipo>Tipo de operação: {operation.tipo}</TextTipo>
          <TextOperador>Colaborador {operation.colaborador}</TextOperador>
          <TextMaquina>Maquinario {operation.maquina}</TextMaquina>
        </ContentText>
        <Button style={{backgroundColor: '#125'}} onPress={setProblme}>
          <TextButton>Relatar Problema?</TextButton>
        </Button>
      </Wrapper>
      <ButtonView>
        <Button onPress={finalizarOperacao}>
          <TextButton>Finalizar</TextButton>
        </Button>
      </ButtonView>
    </Container>
  );
}
