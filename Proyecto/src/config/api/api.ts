import {API_URL} from '@env'
import axios from 'axios'



const apiLicita=axios.create({
  baseURL:API_URL,
  headers:{
    'Content-type':'application/json',
  }
})


export {
  apiLicita
}