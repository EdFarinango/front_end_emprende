import axios from "axios";



const axiosClient = axios.create({
  baseURL: 'https://backend-emprende.herokuapp.com/v1/api/'
})
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const { response } = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    window.location.reload();
  } else if (response.status === 404) {
    window.location.href = '/404'
    alert('404: contactese con el administrador')

  
  }

  throw error;
})



export default axiosClient
