import { forgot_password_url } from "constants/api";
import config from "shared/ServiceConfig";
const axios = require('axios').default;

export const forgotPassword = async (body: {}) => {
    const header = await config.authHeader()
    try {
        let response = await axios.post(forgot_password_url, body, {
            params: {},
            headers: header
        })
        return response.data
    } catch (err) {
        console.error(err)
    }
}