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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { View } from "react-native";
import React from "react";

// Custom component to show placeholder
// No props
export default function skelton(props) {
  return (
    <View>
      {/* <Renderindicator overlay={true}></Renderindicator> */}
      <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 100, height: 100, margin: 10, borderRadius: 10 }} />
          <View style={{ marginLeft: 10, justifyContent: 'center' }}>

            <View style={{ width: 200, height: 20, borderRadius: 4 }} />
            <View style={{ width: 200, marginTop: 10, height: 20, borderRadius: 4 }} />
            <View style={{ width: 250, marginTop: 10, marginRight: 20, height: 20, borderRadius: 4 }} />

          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}