import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container, Text} from './styles';

export default function Button({children, loadding = false, ...res}) {
  return (
    <Container {...res}>
      {loadding ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
