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
import {Colors} from 'react-native-ui-lib';
import { SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Dimensions, Alert,Platform, FlatList} from 'react-native';
import colorObject from 'react-native-ui-lib/generatedTypes/style/colors';
module.exports = {

    sublist:
    {
      maxWidth:Dimensions.get('window').width / 3- 10, width: Dimensions.get('window').width / 3, borderColor: 'grey', borderWidth: 0.5, height: 150 , backgroundColor: Colors.white 
    },
    image:{
      width:75, height:75, 
    },
    base:
    {
      height: '100%', backgroundColor: 'white'
    }
      
};