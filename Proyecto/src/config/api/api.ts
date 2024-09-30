
import {STAGE,API_URL} from '@env'
import axios from 'axios'
import { Platform } from 'react-native'


const apiLicita=axios.create({
  baseURL:API_URL,
  headers:{
    'Content-type':'application/json',
  }
})


export {
  apiLicita
}