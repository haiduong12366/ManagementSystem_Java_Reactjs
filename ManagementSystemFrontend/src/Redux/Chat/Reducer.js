import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType"

const initialState = {
    messages: [],
    loading: false,
    error: null,
    chat: null,
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAT_MESSAGES_REQUEST:
        case FETCH_MESSAGES_REQUEST:
        case SEND_MESSAGE_REQUEST:
        case FETCH_CHAT_BY_PROJECT_REQUEST:
            return {
                ...state, loading: true, error: null
            }

        case FETCH_CHAT_MESSAGES_SUCCESS:
        case FETCH_MESSAGES_SUCCESS:
            return { ...state, loading: false, messages: action.messages,chat:action.chatId }

        case SEND_MESSAGE_SUCCESS:
            if(state.messages.length==0)
                return { ...state, loading: false, messages: [...state.messages, action.message] }
            if(state.messages[state.messages.length-1].id == action.message.id ){
                return { ...state, loading: false, messages: state.messages }
            }
            
            return { ...state, loading: false, messages: [...state.messages, action.message] }

        case FETCH_CHAT_BY_PROJECT_SUCCESS:
            return { ...state, loading: false, chat: action.chat }

        case FETCH_CHAT_MESSAGES_FAILURE:
        case FETCH_MESSAGES_FAILURE:
        case SEND_MESSAGE_FAILURE:
        case FETCH_CHAT_BY_PROJECT_FAILURE:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }
}