import axios from "axios"
export const newAxios = axios.create({
  baseURL : 'https://usn-au.herokuapp.com/api/'
})
