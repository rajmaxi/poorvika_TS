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
import { View, ActivityIndicator, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import React, { PureComponent } from "react";
import Skelton from 'components/skelton'
import { ScrollView } from "react-native-gesture-handler";

// Custom loading indicator with center alignment with background color, receive overlay as props
export default function renderIndicator(props: { overlay: boolean }) {

  if (props.overlay == true) {
    return (
      <View style={{ position: "absolute", flex: 1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ alignItems: 'center', width: 120, height: 100, borderRadius: 10, borderWidth: 1, borderColor: '#fff', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: 'white' }}>Please wait...</Text>
        </View>
      </View>
    );
  }
  else {
    return (
      <View>

      </View>
    )
  }
}