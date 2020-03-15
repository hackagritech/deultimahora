import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// pages
import login from './pages/Login';
import homeG from './pages/HomeG';
import homeO from './pages/HomeO';
import detailsO from './pages/DetailsO';
import detailsG from './pages/DetailsG';
import CDetails from './pages/CameraDetails';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {backgroundColor: '#999'},
          headerTitleStyle: {color: '#fff'},
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Login"
          component={login}
          options={{headerTransparent: true, headerTitle: null}}
        />
        <Stack.Screen
          name="HomeG"
          component={homeG}
          options={{headerTitle: 'Operação'}}
        />
        <Stack.Screen
          name="HomeO"
          component={homeO}
          options={{headerTitle: 'Campo'}}
        />
        <Stack.Screen
          name="DetailsO"
          component={detailsO}
          options={{headerTitle: 'Detalhes'}}
        />
        <Stack.Screen
          name="DetailsG"
          component={detailsG}
          options={{headerTitle: 'Detalhes Ocorrido'}}
        />
        <Stack.Screen
          name="CDetails"
          component={CDetails}
          options={{headerTitle: 'Relatar Problema'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
