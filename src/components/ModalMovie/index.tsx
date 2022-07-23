import * as React from 'react';
import {Colors, View, Image, Label, RNImage} from 'src/components';
import {tmdbImage} from 'src/utils';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from 'src/redux/stores';
import {hideModalMovie} from 'src/redux/actions';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {WatchListAddAction, WatchListRemoveAction} from 'src/redux/actions';

export const ModalMovie = () => {
  const {t} = useTranslation();
  const [heightItem, setHeightItem] = useState(0);
  const modalizeRef = useRef<Modalize>(null);
  const {modal_movie, watch_list} = useSelector((state: ReduxState) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (modal_movie && modal_movie.visible && modal_movie.data) {
      modalizeRef.current?.open();
    }
  }, [modal_movie]);
  const selectedData = modal_movie?.data;

  return (
    <Modalize
      onClosed={() => {
        dispatch(hideModalMovie());
      }}
      modalHeight={Dimensions.get('window').height / 2}
      onLayout={event => {
        const {width} = event.layout;
        setHeightItem(width / 2);
      }}
      ref={modalizeRef}
      modalStyle={{backgroundColor: Colors.color3}}>
      {selectedData && (
        <>
          <View
            borderTopRightRadius={12}
            borderTopLeftRadius={12}
            overflow={'hidden'}>
            <Image
              source={{uri: tmdbImage(selectedData?.backdrop_path)}}
              style={{
                height: heightItem,
                width: '100%',
                backgroundColor: 'transparent',
              }}
            />
          </View>
          <View margin={24} flexDirection={'row'}>
            <View borderRadius={8} overflow={'hidden'}>
              <Image
                source={{uri: tmdbImage(selectedData?.poster_path)}}
                resizeMode={'cover'}
                style={{
                  height: 120,
                  width: 80,
                  backgroundColor: 'transparent',
                }}
              />
            </View>
            <View marginLeft={12} flex={1}>
              <Label numberOfLines={2} size={18} fontWeight={'500'}>
                {selectedData?.title || selectedData?.name}
              </Label>
              <View flexDirection={'row'}>
                <RNImage
                  source={require('src/assets/images/SF_star_circle_fill-1.png')}
                  style={{height: 16, width: 16}}
                />
                <Label color={'color1'} size={12}>
                  {selectedData?.vote_average} ({selectedData?.vote_count})
                </Label>
              </View>
              <View marginTop={4}>
                <Label size={11} fontWeight={'400'} marginBottom={8}>
                  {t('release_date')} :
                  <Label size={11} fontWeight={'500'} marginBottom={2}>
                    {selectedData?.release_date}
                  </Label>
                </Label>

                <TouchableOpacity
                  onPress={() => {
                    watch_list.find((el: any) => el.id === selectedData?.id)
                      ? dispatch(WatchListRemoveAction(selectedData.id))
                      : dispatch(WatchListAddAction([selectedData]));
                    // setLang('radotsan')
                  }}>
                  <View
                    flexDirection={'row'}
                    borderRadius={8}
                    borderWidth={2}
                    borderColor={'color1'}
                    height={35}
                    paddingHorizontal={12}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    {watch_list.find(
                      (el: any) => el.id === selectedData?.id,
                    ) ? (
                      <>
                        <RNImage
                          source={require('src/assets/images/bookmark.png')}
                          style={{width: 16, height: 16}}
                        />
                        <Label size={12}>{t('remove_from_watch_list')}</Label>
                      </>
                    ) : (
                      <>
                        <RNImage
                          source={require('src/assets/images/bookmark_fill.png')}
                          style={{width: 16, height: 16}}
                        />
                        <Label size={12}>{t('add_to_watch_list')}</Label>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View padding={24}>
            <Label marginBottom={4} size={20} fontWeight={'500'}>
              {t('overview')}
            </Label>
            <Label size={14}>{selectedData?.overview}</Label>
          </View>
        </>
      )}
    </Modalize>
  );
};
