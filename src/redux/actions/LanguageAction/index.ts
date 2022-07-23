import {LANGUAGE} from 'src/redux/types';

export function LanguageAction(payload: string) {
  return {
    type: LANGUAGE,
    payload,
  };
}
