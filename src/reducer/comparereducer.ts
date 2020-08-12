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
  compareitems: [],
  loading: true,
}

/*Define Reducer*/
// Not used...
const comparestate = (state = initialState, action: any) =>
{
    switch(action.type)
    {
      case 'addtocompare':
        //console.log('testing' +action.items)
        return{
          ...state,
          //compareitems: state.compareitems.push(action.items)
        }
    }
  return state
}
export default comparestate;