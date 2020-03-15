import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import {Container} from './styles';
import {
  Card,
  ContentCard,
  TextTipo,
  TextOperador,
  TextCultura,
  TextTalhao,
  TextMaquina,
} from '../HomeG/styles';

export default function HomeO() {
  // states
  const [operations, setOperations] = useState([]);

  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = route.params;

  useEffect(() => {
    let dbRefOp = database().ref('operation');

    function listenerFirebaseOp(dbRef) {
      dbRef.on('value', dataSnapshot => {
        var feedbacks = [];

        dataSnapshot.forEach(child => {
          const op = child.val();
          if (op.status === 'f00' && op.colaborador === user.name) {
            feedbacks.push({
              tipo: op.tipo,
              cultura: op.cultura,
              talhao: op.talhao,
              maquina: op.maquina,
              colaborador: op.colaborador,
              img: op.img,
              smg: op.smg,
              status: op.status,
              id: child.key,
            });
          }
        });
        console.tron.log(feedbacks);
        setOperations(feedbacks.reverse());
      });
    }

    listenerFirebaseOp(dbRefOp);
  }, [user.name]);

  return (
    <Container>
      {operations && (
        <FlatList
          data={operations}
          keyExtractor={item => item.id}
          renderItem={item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsO', {
                  operation: item.item,
                  user,
                })
              }>
              <Card>
                <ContentCard>
                  <TextCultura>Cultura de {item.item.cultura}</TextCultura>
                  <TextTalhao>Talhão: {item.item.talhao}</TextTalhao>
                  <TextTipo>Tipo de operação: {item.item.tipo}</TextTipo>
                  <TextOperador>
                    Colaborador {item.item.colaborador}
                  </TextOperador>
                  <TextMaquina>Maquinario {item.item.maquina}</TextMaquina>
                </ContentCard>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </Container>
  );
}
