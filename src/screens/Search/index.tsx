import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Colors,
  FlatListServerSide,
  Layout,
  ListItem,
  View,
} from 'src/components';
import {TextInput} from 'react-native';
import {MovieModel} from 'src/types';
import {getSearchMultiApi} from 'src/apis';
import {debounce, screenWidth} from 'src/utils';

export const Search = () => {
  const flatlistRef = useRef(null);
  const [heightItem, setHeightItem] = useState(screenWidth() / 1.8);
  const [searchValue, setSearchValue] = useState('');
  const debounceFunc = useCallback(
    debounce(nextValue => {
      setSearchValue(nextValue);
    }, 1400),
    [],
  );

  useEffect(() => {
    if (flatlistRef.current && searchValue) {
      flatlistRef.current.fetchData();
    }
  }, [flatlistRef, searchValue]);

  return (
    <Layout
      showHeader
      headerProps={{
        titleContent: (
          <View
            borderRadius={8}
            backgroundColor={'color3'}
            flex={1}
            height={40}
            justifyContent={'center'}>
            <TextInput
              selectionColor={Colors.color2}
              style={{
                color: Colors.color1,
                padding: 8,
              }}
              onChangeText={val => {
                debounceFunc(val);
              }}
            />
          </View>
        ),
      }}>
      <FlatListServerSide
        ref={flatlistRef}
        fetchOnMount={false}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setHeightItem(width / 1.8);
        }}
        dataRequest={{
          params: {
            query: decodeURIComponent(searchValue),
          },
        }}
        name={searchValue ? searchValue : undefined}
        apiFunction={getSearchMultiApi}
        // style={{backgroundColor: Colors.color1}}
        // name={t(paramsData.page)}
        contentContainerStyle={{
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 14,
        }}
        uniqueKey={'id'}
        numColumns={2}
        renderItem={props => {
          const {item} = props as {item: MovieModel; index: number};
          return (
            <ListItem
              isPerson={item.media_type === 'person'}
              item={item}
              heightItem={heightItem}
            />
          );
        }}
      />
    </Layout>
  );
};
