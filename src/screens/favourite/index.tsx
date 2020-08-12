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
import React, { useState, Component, useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, StatusBar, AsyncStorage, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Navigation } from "react-native-navigation";

import { useDispatch, useSelector } from "react-redux";
import styles from './styles'
import { Colors, Typography, Spacings, Button, Modal, Card, Carousel, Text, View, LoaderScreen } from 'react-native-ui-lib';
import I18n from 'locale/i18n';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { navigatetoscreen } from "navigation/navigatetoscreen";
import Renderindicator from 'components/loaingoverlay'
import SimpleHeader from 'components/simpleheader'
const favourite: favtype = (favprops): JSX.Element => {
  const [componentId, setcomponentId] = useState(favprops.componentId);
  const favitems = useSelector((state: favItemState) => state.favouritestate.favItem)
  const cartitems = useSelector((state: cartItemState) => state.cartstate.cartItem)
  const [overlay, setOverlay] = useState<boolean>(false)
  const login = useSelector((state: any) => state.loginstate.status)
  const dispatch = useDispatch()

  //Add item to the favourite
  // Props: item
  const AddToFav = (item: favItemState) => {
    dispatch({
      type: 'add', item:
      {
        "id": item.id, "price": item.price, "name": item.name, "url": item.url, "by": item.by,
      }
    });
  }

  // Reset favourite item 
  const Reset = async () => {
    if (favitems != null && favitems.length == 0
      // && login==true
    ) {
      try {
        const favitemss = await AsyncStorage.getItem('favitems')
        const favitem = JSON.parse(favitemss);
        // console.log('fav length ' + favitem.length)
        //dispatch({type: 'restore', items: favitem
        //  console.log('Fav Items ' + JSON.stringify(favitemss))
        favitem.forEach(json => {
          //console.log('ID ' + json.id)
          AddToFav(json)
        })
      }
      catch (err) {

      }
    }
  }

  useEffect(() => {
    //Reset()
    SetItems()
    //console.log('restore'+ favitems.length)
  }, [favitems, cartitems]);

  //store favitems and cart items in async
  const SetItems = async () => {
    await AsyncStorage.setItem('cartitems', JSON.stringify(cartitems));
    await AsyncStorage.setItem('favitems', JSON.stringify(favitems));

    if (login == true && favitems.length != 0) {
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          badge: '' + favitems.length
        },
      });
    }
    else if (favitems.length == 0)
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          badge: ''
        },
      });

  }

  // navigate to product details page
  // Props: rowData

  const GotoScreen = (rowData: { id: string, name: string, price: string, quantity: string }) => {
    const options = {
      topBar: {
        //hideOnScroll: true, drawBehind:true, animate: true, 
        //hideOnScroll: true,
        hideOnScroll: false, drawBehind: false, animate: true,
      },
      bottomTabs: { visible: false, drawBehind: true, animate: true },
      layout: {
        orientation: ["portrait"],
      }
    }
    const passProps = {
      id: rowData.id
    }
    navigatetoscreen(I18n.t('screenname.productinfo'), componentId, options, passProps)
  }

  // remove items from favitems
  // Props: rowData
  const Remove = (rowData: { id: string, name: string, price: string, quantity: string }) => {
    setOverlay(true)
    setTimeout(async () => {
      RemoveItems(rowData.id);
    });
  }
  //remove item from favourite by dispatch
  // Props: id
  const RemoveItems = (id: string) => {
    dispatch({
      type: 'remove', item:
      {
        "id": id
      }
    })
    setOverlay(false)
  }

  // render favlistview if user is logged in, othwriwse show emoty view
  const RenderContent = () => {
    if (login == false || favitems == null || favitems.length == 0) {
      return (
        <View flex-1 center>
          <Text normalText style={{ color: 'grey' }}>No Items Added</Text>
        </View>
      )
    }
    else {
      return (
        <View marginT-10 >

          <FlatList
            data={favitems}
            style={{ marginBottom: 0 }}
            horizontal={false}
            renderItem={({ item: rowData, index }) => {
              return (
                <Card padding-3 marginL-5 marginR-5 marginV-5 borderRadius-30 onPress={() => { }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={
                    () => { GotoScreen(rowData) }
                  }>
                    <View row flex-1 >
                      <View style={styles.imagerow}>
                        <Image
                          source={{ uri: rowData.url, }}
                          resizeMode={"contain"}
                          style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1
                          }}
                        />
                      </View>

                      <View style={styles.datarow}>
                        <Text normalText style={{ fontSize: 22, color: 'black' }} numberOfLines={2} ellipsizeMode='tail' textAlign marginB-5 marginT-15>{rowData.name}</Text>
                        <Text textAlign marginB-5 grey20 heading>{rowData.by} </Text>
                        <Text textAlign marginB-5 orange10 heading>{rowData.price} </Text>
                      </View>
                    </View>

                    <View bg-white>
                      <View flex-1 row marginT-0>

                        <TouchableOpacity style={styles.removebutton}
                          onPress={
                            () => {
                              Remove(rowData)
                            }
                          }>
                          <View row style={{ alignItems: 'center' }}>
                            <MaterialIcons name="delete" size={20} />
                            <Text text100BO normalText red10 marginL-5 style={{ fontWeight: '600' }}>{I18n.t('category.remove')}</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>

                  </TouchableOpacity>

                </Card>
              )
            }
            }>
          </FlatList>
        </View>
      )
    }
  }
  // initial checking
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex-1 bg-white>
        <SimpleHeader componentId={componentId} title='Favourite'></SimpleHeader>
        {RenderContent()}
        <Renderindicator overlay={overlay}></Renderindicator>
      </View>
    </SafeAreaView>
  );

}
favourite.options = {
  topBar: {
    visible: false,
    title: { component: { name: 'navHeader' } },
  }
}
export default favourite

