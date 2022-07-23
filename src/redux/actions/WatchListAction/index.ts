import {WATCHLIST_ADD, WATCHLIST_REMOVE} from 'src/redux/types';

export function WatchListAddAction(payload: any[]) {
  return {
    type: WATCHLIST_ADD,
    payload,
  };
}
export function WatchListRemoveAction(payload: string | number) {
  return {
    type: WATCHLIST_REMOVE,
    payload,
  };
}
