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
import React, { useState } from 'react';
import { View } from "react-native";
import { ConnectionStatusBar } from 'react-native-ui-lib';
import NetInfo from "@react-native-community/netinfo";

// Defined custom coponents for show internet connection status if not connected
// Custom components & does not receive any props
export default function connectionstatusbar(props: any) {
  const [connected, setConnected] = useState(true);
  const [tempconnected, setConnectedtemp] = useState(true);

  // Called this function to set status of the internet connection, if internet connection change to true or false 
  const handleConnectivityChange = (state: any) => {

    (tempconnected != state.isConnected) ?
      setConnectedtemp(state.isConnected) : null;
    (tempconnected != state.isConnected) ?
      //console.log( '-----'+state.isConnected)
      (state.isConnected == false) ?
        (connected == true) ?
          setConnected(false) : null
        :
        (connected == false) ?
          setConnected(true) : null
      :
      null

  };
  NetInfo.addEventListener(handleConnectivityChange);

  return (
    <View flex-1 style={{ height: (connected == true ? 0 : 40), marginBottom: (connected == true ? 0 : 40) }}>
      <ConnectionStatusBar useAbsolutePosition={true}
        onConnectionChange={connected => {
          setConnected(connected)
        }
        } />
    </View>
  );
};