import * as React from 'react';
import {Label, Layout, RNImage, RNScrollView, View} from 'src/components';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {fakePromise, randomString, useScrollView} from 'src/utils';
import {
  getMoviePopularApi,
  getMovieTopRatedApi,
  getMovieUpcomingApi,
  getNowPlayingApi,
  getTvAiringTodayApi,
  getTvOnTheAirApi,
  getTvPopularApi,
  getTvTopRatedApi,
} from 'src/apis';
import config from 'src/configs';
import {DrawerActions} from '@react-navigation/native';
import {
  SegmentCard1,
  SegmentCard,
  SegmentCard2,
} from 'src/screens/Home/components';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {openModalMovie, openModalPerson} from 'src/redux/actions';
export const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [flagRefresh, setFlagRefresh] = useState(randomString());

  const {t} = useTranslation();
  const {setIsRefreshing, scrollViewProps} = useScrollView({
    scrollViewProps: {
      showsVerticalScrollIndicator: false,
    },
    onRefresh: async () => {
      setFlagRefresh(randomString());
      setIsRefreshing(true);
      await fakePromise(2000);
      setIsRefreshing(false);
      // onRefreshing();
    },
  });

  return (
    <Layout
      showHeader
      headerProps={{
        title: config.appName,
        headerButtonLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={{
              height: 45,
              width: 45,
              justifyContent: 'center',
            }}>
            <RNImage
              source={require('src/assets/images/SF_line_horizontal_3_decrease_circle_fill-1.png')}
              style={{height: 18, width: 18}}
            />
          </TouchableOpacity>
        ),
        headerButtonRight: (
          <View flexDirection={'row'}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WatchList');
              }}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                // backgroundColor: 'blue',
                alignItems: 'center',
              }}>
              <RNImage
                source={require('src/assets/images/SF_bookmark-3.png')}
                style={{height: 18, width: 18}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
                // dispatch(LanguageAction('id'));
              }}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                // backgroundColor: 'blue',
                alignItems: 'center',
              }}>
              <RNImage
                source={require('src/assets/images/SF_magnifyingglass_circle_fill.png')}
                style={{height: 18, width: 18}}
              />
            </TouchableOpacity>
          </View>
        ),
      }}>
      <RNScrollView {...scrollViewProps}>
        <Label
          color={'color2'}
          size={14}
          fontWeight={'700'}
          marginBottom={4}
          marginHorizontal={24}
          marginTop={24}>
          {moment().format('dddd, MMMM D')}
        </Label>
        <SegmentCard1
          offlineIdentifier={'movie_now_playing'}
          flagRefresh={flagRefresh}
          title={t('movie_now_playing')}
          apiFunction={getNowPlayingApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_top_rated',
              },
            });
          }}
        />
        <View height={24} />
        <SegmentCard
          offlineIdentifier={'movie_top_rated'}
          title={t('movie_top_rated')}
          subtitle={t('top')}
          apiFunction={getMovieTopRatedApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_top_rated',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          offlineIdentifier={'movie_popular'}
          title={t('movie_popular')}
          subtitle={t('top')}
          apiFunction={getMoviePopularApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_popular',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          offlineIdentifier={'movie_upcoming'}
          title={t('movie_upcoming')}
          subtitle={t('top')}
          apiFunction={getMovieUpcomingApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_upcoming',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard1
          offlineIdentifier={'tv_aring_today'}
          title={t('tv_aring_today')}
          apiFunction={getTvAiringTodayApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_aring_today',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          offlineIdentifier={'tv_on_the_air'}
          title={t('tv_on_the_air')}
          subtitle={t('top')}
          apiFunction={getTvOnTheAirApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_on_the_air',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          offlineIdentifier={'tv_top_rated'}
          title={t('tv_top_rated')}
          subtitle={t('top')}
          apiFunction={getTvTopRatedApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_top_rated',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          offlineIdentifier={'tv_popular'}
          title={t('tv_popular')}
          subtitle={t('top')}
          apiFunction={getTvPopularApi}
          onTapItem={item => {
            dispatch(openModalMovie(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_popular',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard2
          offlineIdentifier={'popular_person'}
          title={t('popular_person')}
          onTapItem={item => {
            dispatch(openModalPerson(item));
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'popular_person',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
      </RNScrollView>
    </Layout>
  );
};
