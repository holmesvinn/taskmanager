import "./App.css";
import SidebarNav from "./components/sideNavbar/sidenavbar";
import TaskBarNav from "./components/taskcreator/tasks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppError } from "./store/store-helper/appActions";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { initialiseAppliction } from "./store/store-helper/thunkEffects";

function SecondaryNav({ availableUsers }) {
  return (
    <div className="App">
      <SidebarNav />
      <TaskBarNav availableUsers={availableUsers} />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const availableUsers = useSelector((state) => state.userData.availableUsers);

  useEffect(() => {
    (async function initialiseApp() {
      try {
        dispatch(initialiseAppliction());
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
