import * as React from 'react';
import {
  Colors,
  View,
  Image,
  Label,
  RNImage,
  RNScrollView,
} from 'src/components';
import {tmdbImage} from 'src/utils';
import {TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from 'src/redux/stores';
import {hideModalPerson, openModalMovie} from 'src/redux/actions';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
export const ModalPerson = () => {
  const {t} = useTranslation();
  const modalizeRef = useRef<Modalize>(null);
  const {modal_person} = useSelector((state: ReduxState) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (modal_person && modal_person.visible && modal_person.data) {
      modalizeRef.current?.open();
    }
  }, [modal_person]);
  const selectedData = modal_person?.data;

  return (
    <Modalize
      onClosed={() => {
        dispatch(hideModalPerson());
      }}
      ref={modalizeRef}
      modalStyle={{backgroundColor: Colors.color3}}>
      {selectedData && (
        <>
          <View alignItems={'center'} margin={24}>
            <Image
              borderRadius={10}
              source={{uri: tmdbImage(selectedData.profile_path)}}
              resizeMode={'cover'}
              style={{
                width: 150,
                height: 250,
              }}
            />
            <Label size={18} fontWeight={'700'} marginTop={12}>
              {selectedData.name}
            </Label>
          </View>
          <View marginTop={12} paddingHorizontal={24}>
            <Label size={16} fontWeight={'700'} marginBottom={10}>
              {t('known_for_department')}
            </Label>
            <Label size={14}>{selectedData.known_for_department || '-'}</Label>
          </View>
          <View marginTop={12} paddingHorizontal={24}>
            <Label size={16} fontWeight={'700'} marginBottom={10}>
              {t('popularity')}
            </Label>
            <Label size={14}>{selectedData.popularity}</Label>
          </View>

          <View marginTop={12}>
            <Label
              size={16}
              fontWeight={'700'}
              paddingHorizontal={24}
              marginBottom={10}>
              {t('known_for')}
            </Label>
            <RNScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{
                paddingLeft: 24,
                paddingRight: 14,
              }}>
              {selectedData.known_for.map(el => (
                <View key={el.id} marginRight={10} width={120}>
                  <View borderRadius={10} overflow={'hidden'} marginBottom={10}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(openModalMovie(el));
                      }}>
                      <Image
                        source={{uri: tmdbImage(el.poster_path)}}
                        style={{
                          height: 190,
                          width: 120,
                          backgroundColor: 'transparent',
                        }}
                      />
                      <View
                        position={'absolute'}
                        left={-4}
                        top={0}
                        backgroundColor={'rgba(0,0,0,0.63)'}
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        paddingHorizontal={8}
                        paddingVertical={2}
                        borderBottomRightRadius={4}>
                        <RNImage
                          source={require('src/assets/images/SF_star_circle_fill-1.png')}
                          style={{height: 15, width: 15}}
                        />
                        <Label color={'color1'} size={10}>
                          {el.vote_average}
                        </Label>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Label numberOfLines={2}>{el.name}</Label>
                </View>
              ))}
            </RNScrollView>
          </View>
        </>
      )}
    </Modalize>
  );
};
