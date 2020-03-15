import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {
  Picker,
  Alert,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Overlay, Input} from 'react-native-elements';
// import {useRoute} from '@react-navigation/native';

import {
  Container,
  ViewFloat,
  ModalContent,
  ButtonContent,
  ContentInputs,
  TextButton,
  Button,
  ContentList,
  Card,
  ContentCard,
  TextTipo,
  TextOperador,
  TextCultura,
  TextTalhao,
  TextMaquina,
} from './styles';

export default function HomeG() {
  let dbRefOperation = database().ref('operation');
  // states
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectTipo, setSelectTipo] = useState('');
  const [cultura, setCultura] = useState('');
  const [talhao, setTalhao] = useState('');
  const [maquina, setMaquina] = useState('');
  const [colaborador, setColaborador] = useState('');

  const [users, setUsers] = useState([]);
  const [operations, setOperations] = useState([]);
  // const route = useRoute();
  // const {user} = route.params;

  // Navigation
  const navigation = useNavigation();

  // componendidmount
  useEffect(() => {
    let dbRef = database().ref('user');
    let dbRefOp = database().ref('operation');
    listenerFirebaseUser(dbRef);
    listenerFirebaseOp(dbRefOp);
  }, []);

  function listenerFirebaseUser(dbRef) {
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

  function listenerFirebaseOp(dbRef) {
    dbRef.on('value', dataSnapshot => {
      var feedbacks = [];

      dataSnapshot.forEach(child => {
        feedbacks.push({
          tipo: child.val().tipo,
          cultura: child.val().cultura,
          talhao: child.val().talhao,
          maquina: child.val().maquina,
          colaborador: child.val().colaborador,
          status: child.val().status,
          img: child.val().img,
          smg: child.val().smg,
          id: child.key,
        });
      });
      console.tron.log(feedbacks);
      setOperations(feedbacks.reverse());
    });
  }

  // dispara o valor para o select
  function setValueToSelect(val) {
    setSelectTipo(val);
  }

  // dispara o valor para o select
  function setValueToColaborador(val) {
    setColaborador(val);
  }

  //funcao responsavel para validar e salvar a operacao
  function setOperation() {
    if (cultura === '') {
      Alert.alert('Alerta', 'A cultura deve estar preenchida');
      return;
    }
    if (talhao === '') {
      Alert.alert('Alerta', 'O talhão deve estar preenchida');
      return;
    }
    if (maquina === '') {
      Alert.alert('Alerta', 'A maquina deve estar preenchida');
      return;
    }
    const data = {
      tipo: selectTipo,
      cultura,
      talhao,
      maquina,
      colaborador,
      status: 'f00',
    };

    dbRefOperation
      .push(data)
      .then(data => {
        setVisibleModal(false);
        //success callback
        console.tron.log('data ', data);
      })
      .catch(error => {
        //error callback
        console.tron.log('error ', error);
      });
  }

  return (
    <Container>
      <ContentList>
        {operations && (
          <FlatList
            data={operations}
            keyExtractor={item => item.id}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  if (item.item.status === 'ff0') {
                    return navigation.navigate('DetailsG', {
                      operation: item.item,
                    });
                  }
                }}>
                <Card>
                  <View
                    style={[
                      styles.cardListra,
                      {backgroundColor: `#${item.item.status}`},
                    ]}
                  />
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
      </ContentList>
      <ViewFloat>
        <Icon
          raised
          name="add"
          type="material"
          size={30}
          color="#1f6"
          reverse
          onPress={() => setVisibleModal(true)}
        />
      </ViewFloat>
      <Overlay
        isVisible={visibleModal}
        onBackdropPress={() => setVisibleModal(false)}>
        <ModalContent>
          <ContentInputs>
            <Picker selectedValue={selectTipo} onValueChange={setValueToSelect}>
              <Picker.Item label="Colheita" value="Colheita" />
              <Picker.Item label="Plantio" value="Plantio" />
              <Picker.Item label="Pulverização" value="Pulverização" />
              <Picker.Item label="Adubação" value="Adubação" />
              <Picker.Item label="Revisão" value="Revisão" />
            </Picker>
            <Input
              placeholder="Qual é a cultura?"
              value={cultura}
              onChangeText={setCultura}
            />
            <Input
              placeholder="Qual é o talhão?"
              value={talhao}
              onChangeText={setTalhao}
            />
            <Input
              placeholder="Qual é a mquina?"
              value={maquina}
              onChangeText={setMaquina}
            />
            <Picker
              selectedValue={colaborador}
              onValueChange={setValueToColaborador}>
              {users.map(us => {
                if (us.provider !== true) {
                  return (
                    <Picker.Item
                      key={us.name}
                      label={us.name}
                      value={us.name}
                    />
                  );
                }
              })}
            </Picker>
          </ContentInputs>
          <ButtonContent>
            <Button onPress={setOperation}>
              <TextButton>Salvar</TextButton>
            </Button>
          </ButtonContent>
        </ModalContent>
      </Overlay>
    </Container>
  );
}

const styles = StyleSheet.create({
  cardListra: {
    height: '100%',
    borderRadius: 4,
    width: 8,
  },
});
