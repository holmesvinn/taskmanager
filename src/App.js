import "./App.css";
import SidebarNav from "./components/sideNavbar/sidenavbar";
import TaskBarNav from "./components/taskcreator/tasks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserData,
  updateAppError,
  updateAvailableUsers,
} from "./store/store-helper/appActions";
import axios from "axios";

import {
  ACCESS_TOKEN_ENDPOINT,
  API_URL,
  headers,
  USER_ID_ENDPOINT,
  loginPostPayload,
  ASSIGNED_USERS_ENDPOINT,
} from "./App.config";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function SecondaryNav({ availableUsers }) {
  return (
    <div className="App">
      <SidebarNav />
      <TaskBarNav availableUsers={availableUsers} />
    </div>
  );
}

const getHeadersWithToken = (token) => {
  return {
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  };
};

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const availableUsers = useSelector((state) => state.userData.availableUsers);

  useEffect(() => {
    (async function initialiseApp() {
      try {
        const accessTokenData = await axios.post(
          `${API_URL}${ACCESS_TOKEN_ENDPOINT}`,
          loginPostPayload,
          { headers }
        );

        const userID = await axios.get(
          `${API_URL}${USER_ID_ENDPOINT}`,
          getHeadersWithToken(accessTokenData.data.results.token)
        );

        const AssignedUsers = await axios.get(
          `${API_URL}${ASSIGNED_USERS_ENDPOINT}`,
          getHeadersWithToken(accessTokenData.data.results.token)
        );

        dispatch(updateAvailableUsers(AssignedUsers.data.results.data));
        dispatch(addUserData(userID.data.results));
      } catch (error) {
        dispatch(updateAppError(error));
        setError("Some Error occurred");
      }
    })();
  }, []);

  return (
    <>
      {error ? (
        <>Some Error Occurred while getting data </>
      ) : availableUsers ? (
        <SecondaryNav availableUsers={availableUsers} />
      ) : (
        <>loading....</>
      )}
    </>
  );
}

export default App;
