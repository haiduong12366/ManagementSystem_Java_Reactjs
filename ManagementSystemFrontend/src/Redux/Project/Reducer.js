import { ACCEPT_PROJECT_REQUEST, ACCEPT_PROJECT_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, INVITE_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "./ActionType"

const initialState = {
    projects: [],
    loading: false,
    error: null,
    projectDetails: null,
    searchProjects: [],
    acceptInvitation:null
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case FETCH_PROJECT_BY_ID_REQUEST:
        case INVITE_PROJECT_REQUEST:
        case ACCEPT_PROJECT_REQUEST:
        case UPDATE_PROJECT_REQUEST:
            return { ...state, loading: true, error: null }

        case FETCH_PROJECTS_SUCCESS:
            return { ...state, loading: false, projects: action.payload, error: null }

        case SEARCH_PROJECT_SUCCESS:
            return { ...state, loading: false, searchProjects: action.payload, error: null }

        case CREATE_PROJECT_SUCCESS:
            return { ...state, loading: false, projects: [...state.projects, action.project], error: null }

        case FETCH_PROJECT_BY_ID_SUCCESS:
            return { ...state, loading: false, projectDetails: action.project, error: null }

        case UPDATE_PROJECT_SUCCESS:
            return { ...state, loading: false, projectDetails: action.project, error: null,projects:state.projects.map(item=>{
                console.log(item)
                return item.id == action.project.id ?  action.project : item
            }) }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state, loading: false,
                projects: state.projects.filter(p => p.id !== action.projectId), error: null
            }
        case ACCEPT_PROJECT_SUCCESS:
            return { ...state, loading: false,acceptInvitation:action.payload , error: null }
        default:
            return state
    }
}