import Api from "@/config/api";
import {
  ACCEPT_PROJECT_FAILURE,
  ACCEPT_PROJECT_REQUEST,
  ACCEPT_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  INVITE_PROJECT_FAILURE,
  INVITE_PROJECT_REQUEST,
  INVITE_PROJECT_SUCCESS,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "./ActionType";
import toast from "react-hot-toast";

export const fetchProjects =
  ({ category, tags }) =>
  async (dispatch) => {
    const { api } = Api(localStorage.getItem("jwt"));
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: { category, tags },
      });
      console.log("all project", data);
      dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  const { api } = Api(localStorage.getItem("jwt"));

  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    console.log("search project", data);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProject = (projectData) => async (dispatch) => {
  const { api } = Api(localStorage.getItem("jwt"));

  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    console.log("create project", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = (projectData,projectId) => {
  return async (dispatch) => {
    const { api } = Api(localStorage.getItem("jwt"));

    dispatch({ type: UPDATE_PROJECT_REQUEST });
    try {
      const { data } = await api.put("/api/projects/"+projectId, projectData);
      console.log("update project", data);
      dispatch({ type: UPDATE_PROJECT_SUCCESS, project: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProjectById = (id) => async (dispatch) => {
  const { api } = Api(localStorage.getItem("jwt"));

  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    console.log("fetch project", data);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectById =
  ({ projectId }) =>
  async (dispatch) => {
    const { api } = Api(localStorage.getItem("jwt"));

    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      console.log("delete projects", data);
      dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
      console.log(error);
    }
  };

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    const { api } = Api(localStorage.getItem("jwt"));

    dispatch({ type: INVITE_PROJECT_REQUEST });
    try {
      const res = await api.post("/api/projects/invite", { email, projectId });

      console.log("invite projects", res);
      const data = res.data;
      dispatch({ type: INVITE_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      toast.error("Error inviteToProject");
      dispatch({ type: INVITE_PROJECT_FAILURE, error });
    }
  };

export const acceptInvitation = ({ token, navigate }) => {
  return async (dispatch) => {
    const { api } = Api(localStorage.getItem("jwt"));
    dispatch({ type: ACCEPT_PROJECT_REQUEST });
    try {
      const res = await api.post("/api/projects/accept_invitation", token);
      //navigate("/project"+data.projectId)
      console.log("accept invitation", res);
      const data = res.data;
      dispatch({ type: ACCEPT_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      navigate("/");
      toast.error("Invalid invite");
      dispatch({ type: ACCEPT_PROJECT_FAILURE, error });
    }
  };
};
