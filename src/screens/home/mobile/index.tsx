/*************************************************************************
 * 
 * Poorvika CONFIDENTIAL
 * __________________
 * 
 *  2009 - 2020 Poorvika Systems Incorporated 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Poorvika Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Poorvika Systems Incorporated
 * and its suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Poorvika Systems Incorporated.
 */

import React, { useState, useEffect, useReducer } from 'react';
import I18n from 'locale/i18n';
import { ActivityIndicator, Alert, SafeAreaView, FlatList, AsyncStorage, TouchableOpacity, } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { Colors, Typography, Spacings, Button, Toast, Card, Image, Carousel, Text, View, LoaderScreen, ActionSheet } from 'react-native-ui-lib';
import ConnectionStatusBar from 'components/connectionstatusbar'
import { Navigation } from "react-native-navigation"
import { categoryMain, } from './service'
import StarRating from 'react-native-star-rating';
import styles from './styles'
import Placeholder from 'components/placeholder'


var value: string = ''
const mobile: mobiletypes = (mobileprops) => {
  /*Define State, Function, use Redux*/
  const [showNative, setshowNative] = useState(() => { return false });
  const [sortName, setSortName] = useState('');
  const [showCustomIcons, setshowCustomIcons] = useState(() => { return false });
  const dispatch = useDispatch();
  // const newcount = useSelector(state => state.apiReducer.catReducer.data);
  const [filterData, setFilterData] = useState([]);//0
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [isLoad, setIsLoad] = useState(() => { return false });
  const [count, setCount] = useState();
  const [datamainState, setDatamainState] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [compareButton, setCompareButton] = useState(() => { return false });
  const [listDrid, setListDrid] = useState(() => { return false });
  const [page, setPage] = useState(() => { return 1 });
  useEffect(() => {
    fetchBooks();
  }, [page, sortName]);
  const fetchBooks = async () => {
    let a = [] as any;
    console.log('hit check');
    a = await categoryMain(mobileprops.id, page, sortName);
    console.log('value of catpage', a);
    if (page == 1) {
      if (a.data.length != 0) {
        a.data.forEach((item: any) => {
          item["activeclass"] = false;
          if (item.special) {
            let perValue1 = item.price - item.special;
            let perValue12 = perValue1 / item.price;
            let perValue = perValue12 * 100;
            item["PercenDage"] = Math.round(perValue) + "%";
          }
        });
        setDatamainState(a.data)
      }
    }
    else {
      if (a.data.length != 0) {
        console.log('if')
        a.data.forEach((item: any) => {
          item["activeclass"] = false;
          if (item.special) {
            let perValue1 = item.price - item.special;
            let perValue12 = perValue1 / item.price;
            let perValue = perValue12 * 100;
            item["PercenDage"] = Math.round(perValue) + "%";
          }
        });
        setDatamainState([...datamainState, ...a.data]);
        // setIsLoad(false);
      } else {
        console.log('else');
      }
    }
  }
  const loadMoreCommit = async () => {
    console.log('loadMoreCommit Hit');
    setPage(prevpage => prevpage + 1);
    setIsLoad(true);
  };
  const comparePress = () => {
    console.log("element item");
    let a = (compareButton) ? false : true;
    console.log(a);
    setCompareButton(prevCompareButton => prevCompareButton = a)
  }
  const compareAdd = (e: any) => {
    var a = [] as any, filteredList = [] as any;
    // var a:string[] = [] 
    //const result:any[] = []
    filteredList = datamainState.filter((item: any) => item.id == e.id);
    //console.log('a length', filterData.length); //0
    if (filterData.length < 2) {
      console.log('if');
      filteredList.forEach((item: any) => item["activeclass"] = true);
      a = datamainState.filter((item: any) => item.activeclass == true)
      setFilterData(a)
    } else {
      console.log('else');
    }
    console.log('compareAdd a', a);
    forceUpdate();
  }
  const compareRemove = (e: any) => {
    // console.log("compareRemove", e);
    let filteredList = datamainState.filter((item: any) => item.id === e.id);
    filteredList.forEach((item: any) => item["activeclass"] = false);
    let a = datamainState.filter((item: any) => item.activeclass == true);
    console.log('remove a', a);
    setFilterData(a);
    forceUpdate();
  }
  const compareConfirm = () => {
    console.log("compareConfirm");
    Navigation.push(catProps.componentId, {
      component: {
        id: 'comparePageID',
        name: 'comparePage',
        passProps: {
          paramsValue: filterData
        }, options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }
  const _productInfoPage = (element: { id: string }) => {
    console.log('_productInfoPage', element);
    Navigation.push(catProps.componentId, {
      component: {
        id: 'porductInfopageID',
        name: 'porductInfo',
        passProps: {
          paramsValue: element.id
        }, options: {
          bottomTabs: {
            visible: false,
            drawBehind: true
          }
        }
      }
    });
  }

  const renderItem = (item: any) => {
    // console.log("item", item);
    return (
      <View style={{ flex: 1 }}>

        {
          (listDrid) ? (<>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%' }}>
              <View style={{ width: '40%', position: 'relative' }}>
                <TouchableOpacity onPress={() => _productInfoPage(item)}>
                  <Image style={{ width: 100, height: 160 }} resizeMode='contain' source={{ uri: item.image }} />
                </TouchableOpacity>
                {
                  (compareButton) ? (
                    <>
                      {
                        (!item.activeclass) ? (
                          <>
                            <View style={styles.compare}>
                              <TouchableOpacity onPress={() => compareAdd(item)}>
                                <Text style={{ color: '#ff9000', }}>
                                  Compare
                                                    </Text>
                              </TouchableOpacity>
                            </View>
                          </>) : (
                            <>
                              <View style={styles.addedPro}>
                                <TouchableOpacity onPress={() => compareRemove(item)}>
                                  <Text style={{ backgroundColor: '#ff9000', color: '#fff', marginLeft: 10, marginRight: 10 }} >
                                    Added
                                                        </Text>
                                </TouchableOpacity>
                              </View>
                            </>)
                      }
                    </>
                  ) : null
                }
              </View>
              <TouchableOpacity onPress={() => _productInfoPage(item)}>
                <View style={{ width: '60%' }}>
                  <Text>{item.name}</Text>
                  <Text>By:{item.manufacturer}</Text>
                  {

                    (item.special) ? (<>
                      <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.special_formated}</Text>
                      <Text style={{ color: '#bfbcba', fontSize: 12 }}>{item.price_formated}</Text>
                      <Text style={{ color: '#f1840f', fontSize: 18 }}>
                        {item.PercenDage}
                      </Text>

                    </>) : (<>
                      <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.price_formated}</Text>
                    </>)
                  }
                  <View style={{ width: '70%' }}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={item.rating}
                      fullStarColor='#1af10f'
                      starSize={15}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>) : (<>
            <View style={{ width: '100%', position: 'relative', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => _productInfoPage(item)}>
                <Image style={{ width: 80, height: 150 }} resizeMode='contain' source={{ uri: item.image }} />
              </TouchableOpacity>
              {
                (compareButton) ? (
                  <>
                    {
                      (!item.activeclass) ? (
                        <>
                          <View style={styles.compare}>
                            <TouchableOpacity onPress={() => compareAdd(item)}>
                              <Text style={{ color: '#ff9000', }}>
                                Compare
                                                    </Text>
                            </TouchableOpacity>
                          </View>
                        </>) : (
                          <>
                            <View style={styles.addedPro}>
                              <TouchableOpacity onPress={() => compareRemove(item)}>
                                <Text style={{ backgroundColor: '#ff9000', color: '#fff', marginLeft: 10, marginRight: 10 }} >
                                  Added
                                                        </Text>
                              </TouchableOpacity>
                            </View>
                          </>)
                    }
                  </>
                ) : null
              }
            </View>
            <TouchableOpacity onPress={() => _productInfoPage(item)}>
              <View style={{ width: '100%' }}>
                <Text>{item.name}</Text>
                <Text>By:{item.manufacturer}</Text>
                {

                  (item.special) ? (<>
                    <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.special_formated}</Text>
                    <Text style={{ color: '#bfbcba', fontSize: 12 }}>{item.price_formated}</Text>
                    <Text style={{ color: '#f1840f', fontSize: 18 }}>
                      {item.PercenDage}
                    </Text>

                  </>) : (<>
                    <Text style={{ color: '#f1840f', fontSize: 14 }}>{item.price_formated}</Text>
                  </>)
                }
                <View style={{ width: '70%' }}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={item.rating}
                    fullStarColor='#1af10f'
                    starSize={15}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </>)
        }
      </View>
    )
  }
  const openAction = () => {
    setshowNative(true);
  }
  const _chnageView = () => {
    (listDrid) ? setListDrid(false) : setListDrid(true);
  }
  const _onDismissModel = () => {
    console.log('_onDismissModel');
    setshowNative(false);
  }
  const pickOption = (value: any) => {
    // console.log(value);
    switch (value) {
      case '1':
        setSortName('&sort=pd.name&order=ASC')
        setPage(1);
        break;
      case '2':
        setSortName('&sort=pd.name&order=DESC')
        setPage(1);
        break;
      case '3':
        setSortName('&sort=p.price&order=DESC')
        setPage(1);
        break;
      case '4':
        setSortName('&sort=p.price&order=ASC')
        setPage(1);
        break;
      case '5':
        setSortName('&sort=rating&order=DESC')
        setPage(1);
        break;
      case '6':
        setSortName('&sort=rating&order=ASC')
        setPage(1);
        break;
      default:
        setSortName('')
        setPage(1);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <ActionSheet
          title='SORT BY'
          message='Message of action sheet'
          destructiveButtonIndex={0}
          options={[
            { label: 'Default', onPress: () => pickOption('0') },
            { label: 'Name (A-Z)', onPress: () => pickOption('1') },
            { label: 'Name (Z-A)', onPress: () => pickOption('2') },
            { label: 'Price-High to Low', onPress: () => pickOption('3') },
            { label: 'Price-Low to High', onPress: () => pickOption('4') },
            { label: 'Rating (Highest)', onPress: () => pickOption('5') },
            { label: 'Rating (Lowest)', onPress: () => pickOption('6') },
            // { label: 'cancel', onPress: () => pickOption('cancel') },
          ]}
          visible={showNative}
          onDismiss={_onDismissModel}
        />
      </View>
      {
        (datamainState.length != 0) ? (
          <>
            <View style={{ flex: 1, justifyContent: 'center', position: 'relative' }}>
              <View style={{ width: '100%', flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 25 }}>

                <View style={{ width: '33%' }}>
                  <TouchableOpacity onPress={comparePress}>
                    <Text style={[(compareButton) ? { color: '#ff9000' } : { color: '#000' }]}>
                      Compare
                                </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '34%' }}>
                  <TouchableOpacity onPress={openAction}>
                    <Text style={{ textAlign: 'center' }}>
                      sort
                                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '33%' }}>
                  <TouchableOpacity onPress={_chnageView}>
                    <Text style={{ textAlign: 'center' }}>
                      Filter
                                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {
                  (listDrid) ? (
                    <>
                      <FlatList
                        data={datamainState}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                        //infinityScroll
                        ListFooterComponent={() => {
                          return (
                            <View marginB-50>
                              <ActivityIndicator size='large' />
                              <Text normalText>Loading Items</Text>
                            </View>
                          )
                        }}
                        onEndReached={loadMoreCommit}
                        onEndReachedThreshold={0.7}
                        //lazyLoad
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={10} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={7} // Reduce the window size
                      />
                    </>) : (<>
                      {/* //false */}
                      <FlatList
                        numColumns={2}
                        horizontal={false}
                        key={2}
                        data={datamainState}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                        //infinityScroll
                        ListFooterComponent={() => {
                          return (
                            <View marginB-50>
                              <ActivityIndicator size='large' />
                              <Text normalText>Loading Items</Text>
                            </View>
                          )
                        }}
                        onEndReached={loadMoreCommit}
                        onEndReachedThreshold={0.7}
                        //lazyLoad
                        removeClippedSubviews={true} // Unmount components when outside of window 
                        initialNumToRender={10} // Reduce initial render amount
                        maxToRenderPerBatch={1} // Reduce number in each render batch
                        updateCellsBatchingPeriod={100} // Increase time between renders
                        windowSize={7} // Reduce the window size
                      />
                    </>)
                }

              </View>

              <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end', width: '100%' }}>
                {
                  (filterData.length == 1) ? (
                    <>
                      <View style={{ backgroundColor: "#959595", height: 35, alignItems: 'center', paddingTop: 4 }}>
                        <Text>Please select another one product</Text>
                      </View>
                    </>) : null
                }
                {
                  (filterData.length > 1) ? (
                    <>
                      <TouchableOpacity onPress={compareConfirm}>
                        <View style={{ backgroundColor: "#ff9000", height: 35, alignItems: 'center', paddingTop: 4 }}>
                          <Text>Compare Now</Text>
                        </View>
                      </TouchableOpacity>
                    </>) : null
                }
              </View>
            </View>
          </>) : null
      }
    </SafeAreaView>
  )
};
export default mobile;