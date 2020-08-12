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
import { StyleSheet } from 'react-native';
const catestylesheet = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    width: '100%'
  },
  compare: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: '#fff',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 21,
    paddingLeft: 0,
    fontSize: 12,
    borderRadius: 4,
    letterSpacing: 0.5
  },
  addedPro: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: '#ff9000',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 18,
    paddingLeft: 0,
    fontSize: 12,
    borderRadius: 4,
    letterSpacing: 0.5
  },
})
export default catestylesheet 