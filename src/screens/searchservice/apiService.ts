// https://appapinew.poorvikamobile.com/app/output/showroom.json
import axios from 'axios';
export const getServicecenter = async () => {
    try {
        const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=rest/servicecenter/getServicecenter') //use data destructuring to 
        return response
    }
    catch (error) {
        console.log(error, 'getServicecenter');
    }
}