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
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { View, Text, Card, Button, Image, Carousel, } from 'react-native-ui-lib';
import { SafeAreaView, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { compareProapi } from './compareServices';
import HTML from 'react-native-render-html';
import styles from './compareStyle';
import CustomHeader from 'components/customheader'

console.disableYellowBox = true
const comparePage: React.FC<comparepageProps> = (comparepageProps: any) => {
    const [datamainState, setDatamainState] = useState([]);
    const [productId1, setProductId1] = useState('');
    const [productId2, setProductId2] = useState('');
    const comitems = useSelector((state: Array<{ id: number }>) => state.comparestate.compareitems);

    //const comparestate = useSelector((state:any) => state.comparestate.cartitem)
    useEffect(() => {
       // console.log('compare page', comparepageProps);
        fetchApi();
    }, [])
    async function fetchApi() {
        let productId: Array<number> = [], storeValue = [] as any, indexPrint = [] as any;
        productId.push(comitems[0]);
        productId.push(comitems[1]);
        // Alert.alert(''+comitems)
        // comitems.forEach((element: any) => {
        //     productId.push(element.id);
        //     //Alert.alert(''+JSON.parse(element.id))
        // });

        (productId.length != 0) ? storeValue = await compareProapi(productId) : null;
        (storeValue.length != 0) ? (setDatamainState(storeValue.data.products)) : null;
        if (storeValue.data.products.length != 0) {
            var findProductId = storeValue.data.products.find((item: any) => {
                return item.name == "product_id";
            })
            setProductId1(findProductId.value[0])
            setProductId2(findProductId.value[1])
        }
    }
    interface User {
        value: string[];
        name: string,
    }
    const renderItem = (data: User) => {
        return (
            <View flex style={{ position: 'relative', justifyContent: 'center', }}>

                {
                    (data.name != 'product_id' && data.name != 'name' && data.name != 'thumb' && data.name != 'special' && data.name != 'manufacturer' && data.name != 'availability' && data.name != 'minimum' && data.name != 'rating' && data.name != 'reviews' && data.name != 'GENERAL' && data.name != 'BODY' && data.name != 'DISPLAY' && data.name != 'SOUND' && data.name != 'MEMORY' && data.name != 'DATA' && data.name != 'CAMERA' && data.name != 'FEATURES' && data.name != 'BATTERY' && data.name != 'IN THE BOX') ? (<>
                        <View row>
                            <View row style={styles.contentContainer}>
                                <HTML containerStyle={styles.contentBody} html={data.value[0]} imagesMaxWidth={Dimensions.get('window').width} />
                                <HTML containerStyle={styles.contentBody} html={data.value[1]} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>
                        </View>
                    </>) : null
                }
                {

                    (data.name == 'thumb') ? (<>
                        <View row style={styles.proImage}>
                            <Image style={[styles.proImagecontain, { borderColor: '#333' }]} resizeMode='contain' source={{ uri: data.value[0] }} />
                            <Image style={styles.proImagecontain} resizeMode='contain' source={{ uri: data.value[1] }} />
                        </View>

                    </>) : null
                }
                {
                    (data.name != 'product_id' && data.name != 'name' && data.name != 'thumb' && data.name != 'price' && data.name != 'special' && data.name != 'model' && data.name != 'manufacturer' && data.name != 'availability' && data.name != 'minimum' && data.name != 'rating' && data.name != 'reviews') ?
                        <View>
                            <Text style={styles.specName}>{data.name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10, width: '96%', marginLeft: 'auto', marginRight: 'auto' }}>
                                <HTML containerStyle={{ width: '48%', borderRightWidth: 1, marginBottom: 10 }} html={data.value[0]} imagesMaxWidth={Dimensions.get('window').width} />
                                <HTML containerStyle={{ width: '48%', marginLeft: 20, marginBottom: 10 }} html={data.value[1]} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>
                        </View> : null
                }
            </View >
        )
    }
    const _addCart = (productId: string) => {
       // console.log("add", productId);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader componentId={comparepageProps.componentId} title='Compare'></CustomHeader>
            {
                (datamainState.length != 0) ? (
                    <>
                        <View flex style={styles.firstView}>
                            <View marginB-50>
                                <FlatList
                                    data={datamainState}
                                    renderItem={({ item }) => renderItem(item)}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <View row style={styles.addButton}>
                                <View style={styles.cartButton}>
                                    <TouchableOpacity onPress={() => _addCart(productId1)}>
                                        <Text style={{ color: '#fff' }}>Add To Cart</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cartButton}>
                                    <TouchableOpacity onPress={() => _addCart(productId2)}>
                                        <Text style={{ color: '#fff' }}>Add To Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>) : null
            }
        </SafeAreaView >
    )
};
comparePage.options = {
    topBar: {
        title: { component: { name: 'navHeader', alignment: 'center' } },
    }
}
export default comparePage;
