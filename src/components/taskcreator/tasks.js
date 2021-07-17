import "./tasks.css";
import "../../assets/archive.svg";
import { addDraftTask } from "../../store/store-helper/appActions";
import { useSelector, useDispatch } from "react-redux";
import CollapsedTask from "../collapsedComponent/collapsed";
import NewTask from "../draftsComponent/drafts";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// New Draft tasks to be created the number of times the Add button is pressed
function NewTaskList(props) {
  return (
    <>
      {props.drafts.map((draft) => (
        <NewTask
          isEdit={false}
          key={draft.id}
          task={draft}
          user={props.user}
          assignUsers={props.assignUsers}
        />
      ))}
    </>
  );
}

// complete task widget with header, draft tasks (when add is pressed), collapsed tasks
function Tasks({ assignUsers }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.applicationData.tasks);
  const drafts = useSelector((state) => state.applicationData.taskDrafts);
  const user = useSelector((state) => state.userData.user);

  return (
    <div className="tasks-section">
      <div className="tasks-head">
        <h4>TASKS {tasks.length}</h4>

        <Tippy className="font-small" content={"Add Task"}>
          <button
            className="add-new-task"
            onClick={() =>
              dispatch(
                addDraftTask({
                  id: new Date().getTime(),
                  description: "Follow up",
                })
              )
            }
          >
            +
          </button>
        </Tippy>
      </div>

      <NewTaskList drafts={drafts} assignUsers={assignUsers} user={user} />

      {tasks.map((task, index) => (
        <CollapsedTask
          key={index}
          task={task}
          assignUsers={assignUsers}
          user={user}
        />
      ))}

      <div></div>
    </div>
  );
}

export default function TaskBarNav({ availableUsers }) {
  return (
    <div className="tasks-nav-bar">
      <Tasks assignUsers={availableUsers} />
    </div>
  );
}
