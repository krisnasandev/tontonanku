import React from 'react';
import Navigators from 'src/navigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from 'src/i18n';
import {setupAxios} from 'src/utils';
import config from 'src/configs';
import GlobalFont from 'react-native-global-font';
import {ActivityIndicator, LogBox} from 'react-native';
import {Label, RNImage, View, ModalPerson, ModalMovie} from 'src/components';
import {Provider as ProviderRedux} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import stores from 'src/redux/stores';
export const init_i18n = i18n;
setupAxios();
LogBox.ignoreLogs([
  'Task orphaned for request',
  'Require cycle',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const toastConfig = {
  success: ({text1}) => (
    <View padding={20} style={{width: '100%'}}>
      <View
        padding={15}
        borderRadius={8}
        backgroundColor={'color3'}
        borderColor={'color1'}
        borderWidth={1}
        flexDirection={'row'}
        alignItems={'center'}>
        <RNImage
          source={require('src/assets/images/checkmark_circle_fill.png')}
          style={{width: 16, height: 16}}
        />
        <Label marginLeft={4} color={'color1'} numberOfLines={2}>
          {text1 || 'Success'}
        </Label>
      </View>
    </View>
  ),
  error: ({text1}) => (
    <View padding={20} style={{width: '100%'}}>
      <View
        padding={15}
        borderRadius={8}
        backgroundColor={'color5'}
        flexDirection={'row'}
        alignItems={'center'}>
        <RNImage
          source={require('src/assets/images/xmark_circle_fill.png')}
          style={{width: 16, height: 16}}
        />
        <Label marginLeft={4} color={'color1'} numberOfLines={2}>
          {text1 || 'Failed'}
        </Label>
      </View>
    </View>
  ),
};
const App = () => {
  GlobalFont.applyGlobal(config.fontFamily);

  const {store, persistor} = stores();
  // store.subscribe(() => {
  //   if (Object.keys(store.getState()).includes('offline')) {
  //     // setStorage('offline', JSON.stringify(store.getState().offline))
  //     //   .then(() => {})
  //     //   .catch(() => {});
  //   }
  // });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ProviderRedux store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <SafeAreaProvider>
            <Navigators />
            <ModalPerson />
            <ModalMovie />
            {/*@ts-ignore*/}
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </PersistGate>
      </ProviderRedux>
    </GestureHandlerRootView>
  );
};

export default App;
