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
import { Colors} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, StatusBar, ScrollView, Dimensions, TouchableOpacity, Alert,Platform, FlatList} from 'react-native';
module.exports = {
    row:
    {
      backgroundColor:'white', height: 50, alignItems: 'center',  paddingLeft: 2
    }, 
    searchicon:
    {
      marginLeft: 10, backgroundColor: 'white'
    },
    textinput:
    {
      backgroundColor: 'white', marginLeft: 20, width: Dimensions.get('window').width -100
    },
    viewstyle:
    {
      height: 50, backgroundColor: 'white', alignItems: 'center', borderBottomColor: 'grey', borderTopColor: 'white', 
                borderLeftColor: 'white', borderRightColor: 'white', borderWidth: 0.5
    },
    search:
    {
      marginLeft:20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    },
    back:
    {
      width: 30, backgroundColor: 'white',height: 50, alignItems: 'center' , justifyContent: 'center'
    }

};