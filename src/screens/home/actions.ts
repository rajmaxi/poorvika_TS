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
const initialState = 
{
  loading: true,
  slidingbanner: []
}

/*Define Reducer*/
const homereducer = (state = initialState, action: any) =>
{
    switch(action.type)
    {
      case 'UPDATE_NETWORK_STATUS':
        return{
          ...state,
          connection: action.connected,
        }
      case 'GET_HOME_CONTENT':
        return{
          ...state,
          loading: true,
        }
      case 'RECEIVE_HOME_CONTENT':
        {
          return{
            ...state,
            loading: false,
            slidingbanner: action.slidingvalues
          }
        }
    }
  return state
}
export default homereducer;