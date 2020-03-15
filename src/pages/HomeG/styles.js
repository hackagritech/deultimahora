import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #888;
`;

export const ViewFloat = styled.View`
  align-items: center;
  position: absolute;

  right: 30px;
  bottom: 60px;
`;

export const ContentInputs = styled.View`
  flex: 1;
  justify-content: space-around;
`;

export const ModalContent = styled.View`
  flex: 1;
  padding: 10px 0;
`;

export const ButtonContent = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  background: #5f6;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const ContentList = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  height: 100%;
  height: 200px;
  border-radius: 4px;
  flex-direction: row;
  elevation: 5;
  margin: 10px;
  background: #fff;
`;

export const ContentCard = styled.View`
  flex: 1;
  padding: 10px 25px;
`;

export const TextTipo = styled.Text`
  font-size: 20px;
  margin-top: 5px;
`;

export const TextOperador = styled.Text`
  font-size: 20px;
  margin-top: 5px;
`;

export const TextCultura = styled.Text`
  font-size: 20px;
  margin-top: 5px;
`;

export const TextTalhao = styled.Text`
  font-size: 20px;
  margin-top: 5px;
`;

export const TextMaquina = styled.Text`
  font-size: 20px;
  margin-top: 5px;
`;
