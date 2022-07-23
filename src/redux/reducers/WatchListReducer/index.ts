import {WATCHLIST_ADD, WATCHLIST_REMOVE} from 'src/redux/types';
export function WatchListReducer(state = [], action) {
  switch (action.type) {
    case WATCHLIST_ADD:
      return [...state, ...action.payload];
    case WATCHLIST_REMOVE:
      return [...state.filter((el: any) => el.id !== action.payload)];
    default:
      return state;
  }
}
