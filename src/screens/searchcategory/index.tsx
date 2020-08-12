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
import React, { useState, useEffect } from 'react';
import I18n from 'locale/i18n';
import {
  SafeAreaView, Dimensions,
  AsyncStorage, FlatList, TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { Text, View, } from 'react-native-ui-lib';
import ConnectionStatusBar from 'components/connectionstatusbar'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { searchcategoryapi } from './service'

import styles from './styles'
import PlaceHolder from 'components/placeholder'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigatetoscreen } from "navigation/navigatetoscreen";
import CustomHeader from 'components/customheader'

const searchcategory: searchtype = (searchprops) => {
  /*Define State, Function, use Redux*/

  const [componentId, setComponentId] = useState(searchprops.componentId);
  const [getloading, setLoading] = useState<boolean>(false)
  const [mainlist, setMainList] = useState<Array<{ name: string, image: string, category_id: string }>>([])
  const [active, setActive] = useState<number>(-1)
  const [mobilelist, setMobileList] = useState<Array<{ name: string, image: string, category_id: number }>>([])
  const [tvlist, setTvList] = useState<Array<{ name: string, image: string, category_id: number }>>([])
  const [gadgetList, setGadgetList] = useState<Array<{ name: string, image: string, category_id: number }>>([])
  const [tablist, setTabletList] = useState<Array<{ name: string, image: string, category_id: number }>>([])
  const [title, setTitle] = useState<string>('Shop by Category')
  // define inital function on onload
  useEffect(() => {
    I18n.locale = 'fr'
    GetContent()
  }, []);


  // get searchcategory data from api
  // setMobileList,setTabletList,setTvList,setGadgetList
  const GetContent = async () => {

    try {

      setLoading(true)
      const response: responsetype = await searchcategoryapi('');
     // console.log(response)
      // console.log('RESPONSE '+response)
      const datas = response.data;

      var templist: Array<{ name: string, image: string }> = [];
      datas.forEach(element => {
        if (element.category_id == 153) {
          templist.push({ name: element.name, image: element.image })
          const array = element.categories;
          setMobileList(array)
        }
        if (element.category_id == 475) {
          templist.push({ name: element.name, image: element.image })
          const array = element.categories;
          setTabletList(array)
        }
        if (element.category_id == 178) {
          templist.push({ name: element.name, image: element.image })
          const array = element.categories;
          setTvList(array)
        }
        if (element.category_id == 169) {
          templist.push({ name: element.name, image: element.image })
          const array = element.categories;
          setGadgetList(array)
        }
      });
      setMainList(templist);

    } catch (error) {

    }
  }
  // Navigate to product details page
  // Props: id, title
  const GotoScreen = (id: number, title: string) => {

    Promise.all([
      Icon.getImageSource('search', 25),
      AntDesign.getImageSource('shoppingcart', 25),
    ]).then(([src, src1]) => {
      const options = {
        topBar: {
          visible: false, height: 0,
          title: {
            text: title,
          },
          rightButtons: [
            {
              id: 'search',
              icon: src,
              color: 'grey'
            },
            {
              id: 'cart',
              icon: src1,
              color: 'grey'
            },
          ],
        },
        bottomTabs: { visible: false, drawBehind: true, animate: true },
        layout: {
          orientation: ["portrait"],
        }
      }
      const passProps = {
        id: id,
        title: title,
      }
      navigatetoscreen('mobile', componentId, options, passProps)
    });

  }

  // showPlaceHolder
  const ShowPlaceHolder = () => {
    return (
      <PlaceHolder></PlaceHolder>
    )
  }

  // render seperator
  const RenderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "grey",
        }}
      />
    );
  };

  // get list based on active index
  const GetList = () => {
    if (active == 0)
      return tablist;
    else if (active == 1)
      return mobilelist;
    else if (active == 2)
      return tvlist;
    else if (active == 3)
      return gadgetList;
  }

  // Custom function for showlist
  // props: index

  const ShowList = (index: number) => {
    if (index == active) {
      return (
        <FlatList
          data={GetList()}
          numColumns={3}
          renderItem={({ item: rowData, index }) => {
            return (
              <View center flex-1 margin-5 style={styles.sublist}>
                <TouchableOpacity margin-2 style={{ alignItems: 'center' }}
                  onPress={() => {
                    GotoScreen(rowData.category_id, rowData.name)
                  }}>
                  <FastImage
                    style={styles.image}
                    source={{ uri: rowData.image }}
                  />

                </TouchableOpacity>
                <Text normalText margin-2 style={{ textAlign: "center" }} numberOfLines={2}>{rowData.name}</Text>
              </View>
            );
          }
          }
        />
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }
  // render content of the screen
  const Content = () => {
    return (

      <SafeAreaView bg-white style={{ flex: 1 }}>
        <View flex-1 style={styles.base}>
          <ConnectionStatusBar></ConnectionStatusBar>
          <CustomHeader componentId={searchprops.componentId} title={title}></CustomHeader>
          <FlatList
            data={mainlist}
            ItemSeparatorComponent={() => RenderSeparator()}
            renderItem={({ item: rowData, index }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      (active == index ? setActive(-1) : setActive(index))
                      //setTitle(mainlist[index].name)
                    }}>
                    <View row margin-10 flex-1 style={{ alignItems: 'center' }}>
                      <FastImage
                        style={styles.image}
                        source={{ uri: rowData.image }}
                      />
                      <Text marginL-10 normalText >{rowData.name}</Text>
                      <View center style={{ position: 'absolute', right: 10 }}>
                        <SimpleLineIcons name={(active == index ? "arrow-down" : "arrow-right")} size={20} color={'gray'} onPress={() => { }} />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {ShowList(index)}
                </View>
              );
            }
            }
          />

        </View>

      </SafeAreaView>
    );
  }

  // inital checking
  return (
    getloading == false ?
      ShowPlaceHolder()
      :
      Content()
  )

};
export default searchcategory;