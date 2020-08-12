// https://appapinew.poorvikamobile.com/app/output/showroom.json
import axios from 'axios';
export const showroomApi = async () => {
    try {
        const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/output/showroom.json') //use data destructuring to 
        return response
    }
    catch (error) {
        console.log(error, 'showroomApi');
    }
}