import {MODAL_MOVIE, MODAL_PERSON} from 'src/redux/types';
interface Props {
  visible: boolean;
  data: any;
}
export function ModalMovieReducer(
  state: Props = {
    visible: false,
    data: null,
  },
  action,
): Props {
  switch (action.type) {
    case MODAL_MOVIE:
      return action.payload;
    default:
      return state;
  }
}

export function ModalPersonReducer(
  state = {
    visible: false,
    data: null,
  },
  action,
) {
  switch (action.type) {
    case MODAL_PERSON:
      return action.payload;
    default:
      return state;
  }
}
