import {OFFLINE_ADD} from 'src/redux/types';

export function OfflineReducer(state = {}, action) {
  switch (action.type) {
    case OFFLINE_ADD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
