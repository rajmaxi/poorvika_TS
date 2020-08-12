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
export interface cartitemstate {
  showLoading: boolean;
  cartItem: Array<cartItemState>;
  loading: false
}
export const initialState: cartitemstate = {
  cartItem:[],
  showLoading: false,
  loading: false
};

/*Define Reducer*/
const cartstate = (state = initialState, action: any) =>
{
    switch(action.type)
    {
      case 'loading':
        //Think its not used
        return{
          ...state,
          showLoading:true,
        }
      case 'show':
        return{
          ...state,
          loading:true,
        }
      case 'addtocart':
        // Append items to the cart
        // Set loading false
        return{
          ...state,
          cartItem: [...state.cartItem, action.item],
          loading:false,
        }

      case 'removeallcart':
        // Remove All-items from the cart
        // Set loading false
          return{
            ...state,
            cartItem: [],
            loading:false,
          }
      case 'removefromcart':
        // Remove items from the cart by item.id
        // Set loading false
          return{
            ...state,
            cartItem: [...state.cartItem.filter(cartItem => cartItem.id != action.item.id)],
            loading:false,
          }
      case "updatequantity":
        // Update cart item quantity by item.id
        // Set loading false
          return {
            ...state,
            
            cartItem: state.cartItem.map(item => 
                item.id === action.item.id ? { ...item, quantity: action.item.quantity } : item
            ),
            showLoading:false, 
            loading:false,
          };
    }
  return state
}
export default cartstate;