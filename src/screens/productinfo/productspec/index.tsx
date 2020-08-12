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
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    YellowBox,
    Platform,
    FlatList,
    Dimensions,
    Alert
} from 'react-native';
// import { _getProductSepec } from './productSpecservices';
import { View, Text, Card, Button, Image, Carousel, TouchableOpacity, } from 'react-native-ui-lib';
import HTML from 'react-native-render-html';
import styles from './productInfoStyle'
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from 'components/customheader'
console.disableYellowBox = true

// interface Provider {
//     region: string,
//     country: string,
//     locale: string,
//     company: string
// }

// let countryProviders: Array<Provider>;
// let allProviders: Array<Provider>;

const productSpec: React.FC<productSpecPorps> = (productSpecPorps: any) => {

    const [dataSource, setDataSource] = useState([])
    const [descript, setDdescript] = useState()
    // Alert.alert('....'+productSpecPorps.passProps.value)
    useEffect(() => {
       // console.log('productSpec page', productSpecPorps);
        setDataSource(productSpecPorps.passProps.value);
    }, [])
    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#ccc7c7",
                }}
            />
        );
    }
    interface data {
        attribute?: string[],
        name?: string
    }
    const _getpec = (item: data) => {
        //console.log(item);
        return (
            <View>
                <Text style={[styles.FlatListItemStyle, { fontWeight: 'bold' }]}> {item.name} </Text>
                {
                    <FlatList
                        data={item.attribute}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={[styles.sepcData, { color: '#848181' }]}> {item.name}</Text>
                                    </View>
                                    <View style={{ width: '60%' }}>
                                        <Text style={styles.sepcData}> {item.text}</Text>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        )

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader componentId={productSpecPorps.componentId} title='Specification'></CustomHeader>

            {
                (dataSource.length != 0) ? (<>
                    <View marginB-10>
                        <FlatList
                            ItemSeparatorComponent={FlatListItemSeparator}
                            data={dataSource}
                            renderItem={({ item }) => _getpec(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </>) : null
            }
        </SafeAreaView>

    )
}
export default productSpec;

