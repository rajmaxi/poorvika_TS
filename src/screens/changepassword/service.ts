import {changePassword_url, allcoutries_url, state_url, updateAddress_url} from "constants/api";
import config from "shared/ServiceConfig";

const axios = require('axios').default;

export const changePassword = async (body : {}) => {
    const header = await config.authHeader()
    try {
        let response = await axios.put(changePassword_url, body, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}
