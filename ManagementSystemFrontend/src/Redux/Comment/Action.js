import Api from "@/config/api"
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS } from "./ActionType"



export const createComment = (comment) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: CREATE_COMMENT_REQUEST })
        try {
            const { data } = await api.post("/api/comments", comment)
            console.log("Comment created", data)
            dispatch({ type: CREATE_COMMENT_SUCCESS, comment: data })
        } catch (error) {
            dispatch({ type: CREATE_COMMENT_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: DELETE_COMMENT_REQUEST })
        try {
            await api.delete("/api/comments/" + commentId)
            console.log("comment deleted")
            dispatch({ type: DELETE_COMMENT_SUCCESS, commentId })
        } catch (error) {
            dispatch({ type: DELETE_COMMENT_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const fetchComments = (issueId) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: FETCH_COMMENTS_REQUEST })
        try {
            const { data } = await api.get("/api/comments/" + issueId)
            console.log("fetch comments", data)
            dispatch({ type: FETCH_COMMENTS_SUCCESS, comments:data })
        } catch (error) {
            dispatch({ type: FETCH_COMMENTS_FAILURE, error: error.message })
            console.log(error)
        }
    }
}