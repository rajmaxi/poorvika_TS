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
const axios = require('axios').default;
import {productdetails} from 'constants/api';
import settoken from "../../shared/settoken";
import { Alert } from 'react-native';
import config from "../../shared/ServiceConfig";
export const getinfo = async (productid : number, token : string) => {

    try {
        let response = await axios.get(productdetails + productid)
        //console.log('Token is Valid....No problem....')
        return response.data
    } catch (err) {
        if (err.response.data.error[0] == 'The access token provided has expired' || err.response.data.error[0] == 'The access token provided is invalid') {
            const newToken = await settoken();
            return await getinfo(productid, newToken)
        } else 
            return err.code;
        

    }
}
export const addtocartapi = async (productid : number, quantity: number) => {
    
    try {
        let response = await axios.post('https://appapinew.poorvikamobile.com/app/index.php?route=rest/cart/cart', { "option": [], "product_id": productid, "quantity": quantity }
        )
        //console.log('Token is Valid....No problem....')
        return response.data
    } catch (err) {
        // if (err.response.data.error[0] == 'The access token provided has expired' || err.response.data.error[0] == 'The access token provided is invalid') {
        //     const newToken = await settoken();
        //     return await getinfo(productid, newToken)
        // } else 
        //     return err.code;
        

    }
}
export const updatecartquantity = async (key : number, quantity: number) => {
    
    console.log( 'Key & Quantity '+key+' '+quantity);
    try {
        let response = await axios.put('https://appapinew.poorvikamobile.com/app/index.php?route=rest/cart/updateCartV2', 
        { "key": key, "quantity": quantity }
        )
        //console.log('Token is Valid....No problem....')
        return response.data
    } catch (err) {
        //Alert.alert(JSON.stringify(err))
        // if (err.response.data.error[0] == 'The access token provided has expired' || err.response.data.error[0] == 'The access token provided is invalid') {
        //     const newToken = await settoken();
        //     return await getinfo(productid, newToken)
        // } else 
        //     return err.code;
    }
}

export const removecartapi = async (deletekey : string) => {

    try{
        axios({
            method: 'delete',     //put
            url: "https://appapinew.poorvikamobile.com/app/index.php?route=rest/cart/cart",
            headers: {'Content-Type': 'application/json'}, 
            data: {
            key: deletekey
            }
        }).then((res) => {
            console.log("RESPONSE ==== : ", res);
            //Alert.alert(res)
        })
        .catch((err) => {
            console.log("ERROR: ====", err.res.data);
        })
        
    }
    catch(err)
    {
        Alert.alert(JSON.stringify(err.response.data))
    }
    // try {
    //     const header = await config.authHeader()
    //     const data = {
    //         key: deletekey
    //       };
       
    //     let response = await axios.delete('https://appapinew.poorvikamobile.com/app/index.php?route=rest/cart/cart',  data,
    //     {
    //         params: {},
    //         headers: header
    //     })
    //     //console.log('Token is Valid....No problem....')
    //     return response.data
    // } catch (err) {
    //     Alert.alert(JSON.stringify(err.response.data))
    //     // if (err.response.data.error[0] == 'The access token provided has expired' || err.response.data.error[0] == 'The access token provided is invalid') {
    //     //     const newToken = await settoken();
    //     //     return await getinfo(productid, newToken)
    //     // } else 
    //     //     return err.code;
        

    // }
}
