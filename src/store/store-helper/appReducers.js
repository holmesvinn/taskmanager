import { ActionTypes } from "./actionTypes";
import { combineReducers } from "redux";
import { defaultTask } from "./mockdata";

export const appInitialState = {
  user: {},
  availableUsers: [],
  errorData: null,
};

export const tasksInitialState = {
  tasks: [defaultTask],
  taskDrafts: [],
};

const tasksReducer = (state = tasksInitialState, { type, payload }) => {
  const taskData = JSON.parse(JSON.stringify(state.tasks));
  switch (type) {
    case ActionTypes.ADD_DRAFT_TASK:
      const newDraft = JSON.parse(JSON.stringify(state.taskDrafts));
      newDraft.push(payload);
      return { ...state, taskDrafts: newDraft };

    case ActionTypes.DELETE_DRAFT_TASK:
      const drafts = JSON.parse(JSON.stringify(state.taskDrafts));
      const deleteIndex = drafts.findIndex((draft) => draft.id === payload);
      drafts.splice(deleteIndex, 1);
      return { ...state, taskDrafts: drafts };

    case ActionTypes.ADD_TASK:
      taskData.push({ ...payload, completed: false });
      return { ...state, tasks: taskData };

    case ActionTypes.UPDATE_TASK:
      const updatedTaskIndex = taskData.findIndex(
        (task) => task.id === payload.id
      );
      taskData[updatedTaskIndex] = payload;
      return { ...state, tasks: taskData };

    case ActionTypes.DELETE_TAKS:
      const tasks = taskData.filter((task) => task.id !== payload.id);
      return { ...state, tasks: tasks };

    default:
      return state;
  }
};

const appReducer = (state = appInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.UPDATE_USER:
      return { ...state, user: payload };

    case ActionTypes.AVAILABLE_USERS:
      return { ...state, availableUsers: payload };

    case ActionTypes.UPDATE_ERROR:
      return { ...state, errorData: payload };

    default:
      return state;
  }
};

const reducers = combineReducers({
  userData: appReducer,
  applicationData: tasksReducer,
});

export default reducers;
