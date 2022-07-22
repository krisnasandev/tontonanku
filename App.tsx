import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import i18n from 'src/i18n';
import GlobalFont from 'react-native-global-font';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import config from 'src/configs';
import {useTranslation} from 'react-i18next';

function Feed({navigation}) {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{t('name')}</Text>
      <Button title="English" onPress={() => i18n.changeLanguage('en')} />
      <Button title="Indonesia" onPress={() => i18n.changeLanguage('id')} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}
export const init_i18n = i18n;
export default function App() {
  GlobalFont.applyGlobal(config.fontFamily);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <MyDrawer />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
