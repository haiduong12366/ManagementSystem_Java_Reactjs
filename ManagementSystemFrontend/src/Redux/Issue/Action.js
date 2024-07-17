import Api from "@/config/api"
import { ASSIGNED_ISSUE_TO_USER_FAILURE, ASSIGNED_ISSUE_TO_USER_REQUEST, ASSIGNED_ISSUE_TO_USER_SUCCESS, CREATE_ISSUE_FAILURE, CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, FETCH_ISSUES_BY_ID_FAILURE, FETCH_ISSUES_BY_ID_REQUEST, FETCH_ISSUES_BY_ID_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, UPDATE_ISSUE_STATUS_FAILURE, UPDATE_ISSUE_STATUS_REQUEST, UPDATE_ISSUE_STATUS_SUCCESS } from "./ActionType"



export const fetchIssues = (id) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: FETCH_ISSUES_REQUEST })
        try {
            const { data } = await api.get("/api/issues/project/"+ id)
            console.log("fetch issues", data)
            dispatch({ type: FETCH_ISSUES_SUCCESS, issues: data })
        } catch (error) {
            dispatch({ type: FETCH_ISSUES_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST })
        try {
            const { data } = await api.get("/api/issues/"+ id)
            console.log("fetch issue by id", data)
            dispatch({ type: FETCH_ISSUES_BY_ID_SUCCESS, issues: data })
        } catch (error) {
            dispatch({ type: FETCH_ISSUES_BY_ID_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const updateIssueStatus = ({id,status}) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST })
        try {
            const { data } = await api.put(`/api/issues/${id}/status/${status}`)
            console.log("update issue status", data)
            dispatch({ type: UPDATE_ISSUE_STATUS_SUCCESS, issues: data })
        } catch (error) {
            dispatch({ type: UPDATE_ISSUE_STATUS_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const assignIssueToUser = ({issueId,userId}) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: ASSIGNED_ISSUE_TO_USER_REQUEST })
        try {
            const { data } = await api.put(`/api/issues/${issueId}/assignee/${userId}`)
            console.log("assigned issue ---", data)
            dispatch({ type: ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: data })
        } catch (error) {
            dispatch({ type: ASSIGNED_ISSUE_TO_USER_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const createIssue = (issue) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: CREATE_ISSUE_REQUEST })
        try {
            const { data } = await api.post(`/api/issues`,issue)
            console.log("create issue", data)
            dispatch({ type: CREATE_ISSUE_SUCCESS, issue: data })
        } catch (error) {
            dispatch({ type: CREATE_ISSUE_FAILURE, error: error.message })
            console.log(error)
        }
    }
}

export const deleteIssue = (issueId) => {
    return async (dispatch) => {
        const {api} = Api(localStorage.getItem("jwt"))

        dispatch({ type: DELETE_ISSUE_REQUEST })
        try {
            await api.delete("/api/issues/" + issueId)
            console.log("issue deleted")
            dispatch({ type: DELETE_ISSUE_SUCCESS, issueId })
        } catch (error) {
            dispatch({ type: DELETE_ISSUE_FAILURE, error: error.message })
            console.log(error)
        }
    }
}