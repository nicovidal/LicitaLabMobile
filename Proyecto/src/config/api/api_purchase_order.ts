import {API_URL_PURCHASE_ORDER} from '@env'
import axios from 'axios'



const apiLicitaPurchaseOrder=axios.create({
  baseURL:API_URL_PURCHASE_ORDER,
  headers:{
    'Content-type':'application/json',
  }
})


export {
    apiLicitaPurchaseOrder
}