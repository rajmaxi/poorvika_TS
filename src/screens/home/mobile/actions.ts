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
const initialState = {
    compareitems: [],
    loading: true,
    name: '...'
}
/*Define Reducer*/
const comparereducer = (state = initialState, action : any) => {
    switch (action.type) {
        case 'reset':
            return {
                ...state,
                compareitem: []
            }
        case 'addtocompare':
            // console.log('testing' +action.items)
            // for(var i=0;i<state.compareitems.length;i++)
            // {
            // //const tes= JSON.parse(state.compareitems[i]);
            // console.log('WELCOME-->>>'+state.compareitems[i].id)
            // }
            return {
                ...state,
                compareitems: [
                    ...state.compareitems,
                    action.items
                ]

            }
        case 'removefromcompare':
            // console.log('testing' +action.items)
            // return Object.assign({}, state, {
            // compareitems: [...state.compareitems.filter(item => item.id !== action.id)],
            // });
            return {
                ...state,
                compareitems: [...state.compareitems.filter(compareitem => compareitem != action.items)]

            }

    }
    return state
}
export default comparereducer;
