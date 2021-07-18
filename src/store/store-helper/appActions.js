import { ActionTypes } from "./actionTypes";

export const addDraftTask = (draft) => {
  return {
    type: ActionTypes.ADD_DRAFT_TASK,
    payload: draft,
  };
};

export const deleteDraftTask = (draft) => {
  return {
    type: ActionTypes.DELETE_DRAFT_TASK,
    payload: draft,
  };
};

export const addBunchTask = (tasks) => {
  return {
    type: ActionTypes.ADD_ALL_TASKS,
    payload: tasks,
  };
};

export const addNewTask = (newTask) => {
  return {
    type: ActionTypes.ADD_TASK,
    payload: newTask,
  };
};

export const updateTask = (task) => {
  return {
    type: ActionTypes.UPDATE_TASK,
    payload: task,
  };
};

export const deleteTask = (task) => {
  return {
    type: ActionTypes.DELETE_TAKS,
    payload: task,
  };
};

export const addUserData = (user) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: user,
  };
};

export const updateAvailableUsers = (availableUsers) => {
  return {
    type: ActionTypes.AVAILABLE_USERS,
    payload: availableUsers,
  };
};

export const updateAppError = (errorData) => {
  return {
    type: ActionTypes.UPDATE_ERROR,
    payload: errorData,
  };
};
