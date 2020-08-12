
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

//const sagaMiddleware = createSagaMiddleware();
/*Define All states*/
const initialState = 
{
  isloading: false,
  username: '',
  status: false,
}

/*Define Reducer*/
const loginstate = (state = initialState, action: any) => {
  switch (action.type) {
    //Login screen login button
  
    case 'login':
        // Set status & username
        return {...state, status: action.status, username:action.name }
    case 'logout':
      // Set status false
      return{
        ...state,
        status: false,
      }
    case 'checklogin':
      // Set isloading true
      return {
        ...state,
        isloading: true,
      }
    //Login screen login button
    case 'finishlogin':
      // Set isloading false
      return {
        ...state,
        isloading: false,
      }
  }
  return state
}
export default loginstate;