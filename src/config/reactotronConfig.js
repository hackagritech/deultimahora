import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({host: '172.16.2.29'})
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
