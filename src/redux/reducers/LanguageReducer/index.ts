import {LANGUAGE} from 'src/redux/types';

export function LanguageReducer(state = 'en', action) {
  switch (action.type) {
    case LANGUAGE:
      return action.payload;
    default:
      return state;
  }
}
