import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native';

import {Container, ContentImagem, ContentRes, TextStatus} from './styles';

export default function DetailsG() {
  const route = useRoute();
  const {operation} = route.params;
  return (
    <Container>
      <ContentImagem>
        <Image
          style={{flex: 1, borderRadius: 4}}
          source={{uri: operation.img}}
          resizeMode="contain"
        />
      </ContentImagem>
      <ContentRes>
        <TextStatus>{operation.smg}</TextStatus>
      </ContentRes>
    </Container>
  );
}
