import {combineReducers, legacy_createStore as createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {
  LanguageReducer,
  ModalMovieReducer,
  ModalPersonReducer,
  OfflineReducer,
  WatchListReducer,
} from 'src/redux/reducers';
const rootReducer = combineReducers({
  offline: OfflineReducer,
  language: LanguageReducer,
  watch_list: WatchListReducer,
  modal_movie: ModalMovieReducer,
  modal_person: ModalPersonReducer,
});
const primary = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  whitelist: ['language', 'watch_list', 'offline'],
};
export type ReduxState = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer(primary, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};
