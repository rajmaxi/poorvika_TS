import axios from 'axios';
export const privilegeApi = async (phoneno) => {
    try {
        const { data: response } = await axios.get('https://appapinew.poorvikamobile.com/app/index.php?route=feed/rest_api/mloyalurl') 
             
        try {
            const { data: response1 } = await axios.get(response.data[0].url+phoneno) 
                      return response1
        }
        catch (error1) {
            console.log(error1, 'privilegeApi1');
        }
        // return response
    }
    catch (error) {
        console.log(error, 'privilegeApi');
    }
}