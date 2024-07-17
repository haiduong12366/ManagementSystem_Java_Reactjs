import Api from "@/config/api"
import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType"



export const sendMessage = (reqData) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: SEND_MESSAGE_REQUEST })
        try {
            const { data } = await api.post("/api/messages/send", reqData.message)
            reqData.sendMessageToServer(data)
            dispatch({ type: SEND_MESSAGE_SUCCESS, message: data })
            console.log("message send",data)
        } catch (error) {
            dispatch({ type: SEND_MESSAGE_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const webSocket = (message) => {
    return async (dispatch) => {

        dispatch({ type: SEND_MESSAGE_REQUEST })
        try {
            dispatch({ type: SEND_MESSAGE_SUCCESS, message: message })
            console.log("webSocket",message)
        } catch (error) {
            dispatch({ type: SEND_MESSAGE_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST })
        try {
            const { data } = await api.get(`/api/projects/${projectId}/chat`)
            console.log("Fetch chat", data)
            dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: data })
        } catch (error) {
            console.log(error)
            dispatch({ type: FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message })

        }
    }
}

export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST })
        try {
            const { data } = await api.get(`/api/messages/chat/${chatId}`)
            console.log("Fetch messages", data)
            dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, messages: data,chatId })
        } catch (error) {
            console.log(error)
            dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, error: error.message })

        }
    }
}