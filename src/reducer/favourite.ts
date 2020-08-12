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
export interface favitemstate {
  showLoading: boolean;
  favItem: Array<cartItemState>;
  loading: false
}
export const initialState: favitemstate = {
  favItem:[],
  showLoading: false,
  loading: false
};

/*Define Reducer*/
const favouritestate = (state = initialState, action: any) =>
{
    switch(action.type)
    {
      case 'restore':
        // Not used..
        //console.log('restore called... '+JSON.stringify(action.items))
        return{
          ...state,
          favItem: [...state.favItem, [ { [action.payload.key]: action.payload.value} ]]

        }
      case 'showLoading':
        // Set loading true , Not used...
        return{
          ...state,
          loading:true
        }
      case 'removeallfav':
        // Remove All-items from the cart by item.id
        // Set loading false
          return{
            ...state,
            favItem: [],
            loading:false,
          }
      case 'add':
        // Upddate items to the favourite
        return{
          favItem: [...state.favItem, action.item],
          loading: false
        }
      case 'remove':
        // Remove Items from favourite by item.id
          return{
            ...state,
            favItem: [...state.favItem.filter(favItem => favItem.id != action.item.id)],
          }
    }
  return state
}
export default favouritestate;