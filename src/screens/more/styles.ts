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
module.exports = {

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
    marginLeft: 15,  height:45, flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start',
  },
  bottomtext:
  {
    bottom: 0, marginBottom: 10,  width: '100%',flex:1, alignItems: 'center',justifyContent: 'center', position:'absolute'
  }
};