import axios from "axios";
import {
  API_URL,
  TASK,
  LEAD,
  ACCESS_TOKEN_ENDPOINT,
  loginPostPayload,
  headers,
  USER_ID_ENDPOINT,
  ASSIGNED_USERS_ENDPOINT,
  COMPANY_ID,
} from "../../App.config";
import {
  addBunchTask,
  addNewTask,
  addUserData,
  deleteTask,
  updateAvailableUsers,
  updateTask,
} from "./appActions";
import {
  assignedUser,
  defaultTask,
  newAssignedUser,
  secondaryUser,
} from "./mockdata";
import {
  getHeadersWithToken,
  getApiToStoreTransformation,
  getTaskDateFormat,
  getTasTimeInSeconds,
  getStoreToApiTransformation,
} from "./storeService";

export const addBunchTaskEffect = (taskResponse) => (dispatch, getState) => {
  const newTasks = getApiToStoreTransformation(
    taskResponse,
    getState().userData.availableUsers
  );
  dispatch(addBunchTask(newTasks));
};

export const initialiseAppliction = () => async (dispatch, getState) => {
  const accessTokenData = await axios.post(
    `${API_URL}${ACCESS_TOKEN_ENDPOINT}`,
    loginPostPayload,
    { headers }
  );
  if (accessTokenData.data.results?.token) {
    sessionStorage.setItem("accessToken", accessTokenData.data.results.token);
    sessionStorage.setItem(
      "companyID",
      "company_44a3f04d60ac451e86a22d26d15411a0"
    );

    const userID = await axios.get(
      `${API_URL}${USER_ID_ENDPOINT}${COMPANY_ID}${sessionStorage.getItem(
        "companyID"
      )}`,
      getHeadersWithToken()
    );

    const AssignedUsers = await axios.get(
      `${API_URL}${ASSIGNED_USERS_ENDPOINT}${COMPANY_ID}${sessionStorage.getItem(
        "companyID"
      )}`,
      getHeadersWithToken()
    );

    const AllTasks = await axios.get(
      `${API_URL}${TASK}${LEAD}${COMPANY_ID}${sessionStorage.getItem(
        "companyID"
      )}`,
      getHeadersWithToken()
    );

    dispatch(
      updateAvailableUsers(
        AssignedUsers.data.results.data
          ? AssignedUsers.data.results.data
          : [assignedUser, secondaryUser]
      )
    );
    dispatch(addUserData(userID.data.results));
    dispatch(addBunchTaskEffect(AllTasks));
  } else {
    dispatch(updateAvailableUsers([assignedUser, secondaryUser]));
    dispatch(addUserData(assignedUser));
    dispatch(addBunchTask([defaultTask]));
  }
};

export const updateTaskEffect = (updateData) => async (dispatch, getState) => {
  console.log("updatedate existing task", updateData);

  if (
    sessionStorage.getItem("accessToken") &&
    sessionStorage.getItem("accessToken") !== "undefined"
  ) {
    const payload = getStoreToApiTransformation(updateData);
    const updateApiResult = await axios.put(
      `${API_URL}${TASK}${LEAD}/${
        updateData.id
      }${COMPANY_ID}${sessionStorage.getItem("companyID")}`,
      payload,
      getHeadersWithToken()
    );
    const updatedDataForStore = getApiToStoreTransformation(
      updateApiResult,
      getState().userData.availableUsers
    );
    console.log("New updatedTask to be added to Store", updatedDataForStore);
    dispatch(updateTask(updatedDataForStore[0]));
  } else {
    dispatch(updateTask(updateData));
  }
};

export const deleteTaskEffect = (deletedata) => async (dispatch, getState) => {
  console.log("delete  task", deletedata);
  if (
    sessionStorage.getItem("accessToken") &&
    sessionStorage.getItem("accessToken") !== "undefined"
  ) {
    await axios.delete(
      `${API_URL}${TASK}${LEAD}/${
        deletedata.id
      }${COMPANY_ID}${sessionStorage.getItem("companyID")}`,
      getHeadersWithToken()
    );
  }
  dispatch(deleteTask({ id: deletedata.id }));
};

export const addNewTaskEffect = (newTaskData) => async (dispatch, getState) => {
  console.log("add new task", newTaskData);

  if (
    sessionStorage.getItem("accessToken") &&
    sessionStorage.getItem("accessToken") !== "undefined"
  ) {
    const payload = getStoreToApiTransformation(newTaskData);
    const addApiResult = await axios.post(
      `${API_URL}${TASK}${LEAD}${COMPANY_ID}${sessionStorage.getItem(
        "companyID"
      )}`,
      payload,
      getHeadersWithToken()
    );

    const storeData = getApiToStoreTransformation(
      addApiResult,
      getState().userData.availableUsers
    )[0];
    console.log("New Task to be added to store:", storeData);
    dispatch(addNewTask(storeData));
  } else {
    dispatch(addNewTask(newTaskData));
  }
};
