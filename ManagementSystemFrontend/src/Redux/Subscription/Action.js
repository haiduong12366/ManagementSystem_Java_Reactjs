import Api from "@/config/api"
import { GET_USER_SUBSCRIPTION_FAILURE, GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_SUBSCRIPTION_FAILURE, UPGRADE_SUBSCRIPTION_REQUEST, UPGRADE_SUBSCRIPTION_SUCCESS } from "./ActionType"



export const getUserSubscription = () => async (dispatch) => {
    const {api} = Api(localStorage.getItem("jwt"))

    dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST })
    try {
        const { data } = await api.get("/api/subscriptions/user")
        console.log("user subscription", data)
        dispatch({ type: GET_USER_SUBSCRIPTION_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_USER_SUBSCRIPTION_FAILURE, error: error.message })
    }
}

export const upgradeSubsciption = ({planType}) => async (dispatch) => {
    const {api} = Api(localStorage.getItem("jwt"))

    dispatch({ type: UPGRADE_SUBSCRIPTION_REQUEST })
    try {
        const { data } = await api.patch("/api/subscriptions/upgrade",null, {
            params:{
                planType
            }
            })
        console.log("upgrade subscription", data)
        dispatch({ type: UPGRADE_SUBSCRIPTION_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: UPGRADE_SUBSCRIPTION_FAILURE, error: error.message })
    }
}