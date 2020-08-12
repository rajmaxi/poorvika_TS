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
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function search(props) {
    // props.Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
    //     if(buttonId == 'search')
    //     {
    //       setshowmodal(true)
    //         // Navigation.showModal({
    //         //   component: 
    //         //   {
    //         //     id: 'overlay',
    //         //     name: 'overlay',
    //         //     options: {
    //         //       layout: {
    //         //         componentBackgroundColor: 'transparent',
    //         //         },
    //         //       overlay: 
    //         //       {
    //         //         interceptTouchOutside: true,
    //         //       },
    //         //     },
    //         //   }
    //         //   })
    //     }
    // });

    return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="search" color={'gray'} size={20} onPress={() => { props.myFunctions() }} />
        </View>
    );
}