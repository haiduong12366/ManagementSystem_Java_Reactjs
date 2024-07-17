import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_FAILURE, UPDATE_REQUEST, UPDATE_SUCCESS } from "./ActionType"
import Api, { API_BASE_URL } from "@/config/api"
import toast from "react-hot-toast"

export const register = userData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST }) // redux can reconize dispatch in store
    try {
        const  res  = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        const data = res.data
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: REGISTER_SUCCESS, payload: data })
        }
        console.log("register success", res)
    } catch (error) {
        console.log("error", error)
        dispatch({ type: REGISTER_FAILURE,payload: error})
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    const {api} = Api(localStorage.getItem("jwt"))
    dispatch({ type: UPDATE_REQUEST }) // redux can reconize dispatch in store
    try {
        const  res  = await api.post(`${API_BASE_URL}/api/users/update`, userData)
        const data = res.data
        dispatch({ type: UPDATE_SUCCESS, payload: data })
        toast.success("Update Profile success")
        console.log("updateProfile success", res)
    } catch (error) {
        console.log("error", error)
        dispatch({ type: UPDATE_FAILURE,payload: error})
    }
}

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/signin`, userData)
        const data = res.data

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: LOGIN_SUCCESS, payload: data })
        }
        toast.success("Log in success!!")
        console.log("login success", res)
    } catch (error) {
        toast.error("Wrong email or password !!")

        dispatch({ type: LOGIN_FAILURE,payload: error})
    }
}

export const getUser = ()=> async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        dispatch({ type: GET_USER_SUCCESS, payload: data })

        console.log("get user success", data)

    } catch (error) {
        dispatch({ type: GET_USER_FAILURE,payload: error})

    }
}

export const logout =()=> async (dispatch) => {
    dispatch({ type: LOGOUT })
    localStorage.clear()
}