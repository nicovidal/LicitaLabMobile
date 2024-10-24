
import axios from 'axios'
import { API_URL1 } from '@env';



const apiLicita1 = axios.create({
    baseURL: API_URL1,
    headers: {
        'Content-type': 'application/json',
    }
})


export {
    apiLicita1
}