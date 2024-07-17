import axios from "axios"

export const API_BASE_URL = "http://localhost:9090"

const Api =(jwt)=>{
    const api = axios.create({baseURL:API_BASE_URL})
    api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
    api.defaults.headers.post["Content-Type"] = "application/json"
    return {api}
}



export default Api