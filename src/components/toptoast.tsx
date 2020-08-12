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
import { TouchableOpacity } from "react-native";
import React from 'react';
import { Toast, Text, } from 'react-native-ui-lib';
import styles from 'src/screens/home/mobile/styles'
import I18n from 'locale/i18n';

// Custom component to show toast on Top of the view
// Receive componentId, showtoast, setShowToast as Props
export default function toptoast(props: { componentId: string, showtoast: boolean, setShowToast: Function }) {
  return (
    <Toast
      visible={props.showtoast}
      backgroundColor={'white'}
      allowDismiss={true}
      autoDismiss={1500}
      onDismiss={() => {
        props.setShowToast(false)
      }}
      position={'top'}>
      <TouchableOpacity style={styles.toast} onPress={() => props.setShowToast(false)} >
        <Text white text70>
          {I18n.t('category.compareerror')}
        </Text>
      </TouchableOpacity>
    </Toast>
  )
}