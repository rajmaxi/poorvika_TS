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
import { View, SafeAreaView } from "react-native";
import React from "react";
import Skelton from 'components/skelton'

// Custom Skelton layout component
export default function placeholder(props) {
    return (

        <SafeAreaView flex-1>
            <View flex-1 style={{ height: props.height }}>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
                <Skelton></Skelton>
            </View>
        </SafeAreaView>

    );
}