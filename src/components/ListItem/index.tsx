import * as React from 'react';
import {MovieModel} from 'src/types';
import {View, Image, RNImage, Label} from 'src/components';
import {TouchableOpacity} from 'react-native';
import {tmdbImage} from 'src/utils';
import {openModalMovie, openModalPerson} from 'src/redux/actions';
import {useDispatch} from 'react-redux';

export const ListItem = (props: {
  isPerson: boolean;
  item: MovieModel;
  heightItem: number;
}) => {
  const dispatch = useDispatch();
  const {item, heightItem, isPerson} = props;
  return (
    <View flex={1} flexDirection={'column'}>
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (isPerson) {
            dispatch(openModalPerson(item));
          } else {
            dispatch(openModalMovie(item));
          }
        }}>
        <View marginRight={10}>
          <View borderRadius={10} overflow={'hidden'}>
            <Image
              source={{uri: tmdbImage(item.poster_path || item.profile_path)}}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: heightItem,
              }}
            />
            {!isPerson && (
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
                  {item.vote_average}
                </Label>
              </View>
            )}
          </View>
          <View marginVertical={10}>
            <Label numberOfLines={2}>{item.title || item.name}</Label>
            {item.known_for && (
              <Label numberOfLines={2} fontWeight={'400'} size={11}>
                {item.known_for
                  .map((el: any) => el.title || el.name)
                  .join(', ')}
              </Label>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
