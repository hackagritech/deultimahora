import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.View`
  flex: 1;
  background: #888;
  padding: 0 20px;

  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
