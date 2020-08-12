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
import {combineReducers} from 'redux'
import loginstate from 'reducer/loginreducer'
import homereducer from 'screens/home/actions'
import comparereducer from 'screens/home/mobile/actions'
import cartstate from 'reducer/cart'
import favouritestate from 'reducer/favourite'


// Define rootreducer
// Combine all reducer into one reducer that is called root Reducer.
const rootreducer = combineReducers({
    comparestate: comparereducer,
    loginstate: loginstate,
    homestate: homereducer,
    cartstate: cartstate,
    favouritestate: favouritestate,
});
export default rootreducer;