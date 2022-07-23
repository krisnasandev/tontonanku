import {MODAL_PERSON, MODAL_MOVIE} from 'src/redux/types';

export function ModalMovieAction(payload: any) {
  return {
    type: MODAL_MOVIE,
    payload,
  };
}
export function ModalPersonAction(payload: any) {
  return {
    type: MODAL_PERSON,
    payload,
  };
}
export function openModalMovie(data: any) {
  return ModalMovieAction({
    visible: true,
    data,
  });
}
export function hideModalMovie() {
  return ModalMovieAction({
    visible: false,
    data: null,
  });
}
export function openModalPerson(data: any) {
  return ModalPersonAction({
    visible: true,
    data,
  });
}
export function hideModalPerson() {
  return ModalPersonAction({
    visible: false,
    data: null,
  });
}
