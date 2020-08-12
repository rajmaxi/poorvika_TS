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
import React, { useState,Component, useEffect } from 'react';
import {View, Text, Dimensions, Image, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Navigation } from "react-native-navigation";
import { connect } from 'react-redux'
// import SideMenuItem from 'EcommerceApp/src/components/SideMenuItem'
// import Horizontalline from 'EcommerceApp/src/components/Horizontalline'
import { useDispatch, useSelector } from "react-redux";

const deals: MoreComponentType = (MoreComponentProps): JSX.Element =>
{

const [componentId, setcomponentId] = useState(MoreComponentProps.componentId);

useEffect(() => {
  
});

return(
        <SafeAreaView style={{flex:1}}>

                <StatusBar
                  barStyle="dark-content"
                  backgroundColor="#ffffff"
                />

                <View style={{backgroundColor:'#ffffff', flex:1}}>
                
                </View>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        backgroundColor : 'white',
        paddingTop: 22,
        flex: 1
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
      backgroundColor: 'black'
    },
    rowItem:
    {
      flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start',
    }
};
/*MapState toProps to use Store*/
const mapStateToProps = state => ({
    drawerstatus: state.drawerstatus,
})

/*MapDispatch toProps to use Store*/
const mapDispatchToProps = (dispatch) =>({
    setdrawerstatus: () => dispatch({type: 'setdrawerstatus'}),
});

deals.options = {
  topBar: {
    visible: false
  },
  topBar: {
    // leftButtons: {
    //   id: 'lefticon',
    //   icon: require('EcommerceApp/src/images/icons/icon-homes.png')
    // },
    title: { component:{ name: 'navHeader' }},
    rightButtons: [{
      id: 'overview',
      text: 'Overview',
      icon: require('EcommerceApp/src/images/icons/icon-homes.png'),
  }],
  }
}  

/*Use Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps)(deals)

