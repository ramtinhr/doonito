import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'http://45.147.77.110:5000/api',
  // baseURL: 'http://192.168.86.4:5000/api',
})
const AUTH_TOKEN = Cookies.get('accessToken')
if (AUTH_TOKEN) {
  axiosInstance.defaults.headers.common[
    'authorization'
  ] = `Bearer ${AUTH_TOKEN}`
}

export default axiosInstance
