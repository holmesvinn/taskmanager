import "./collapsed.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import NewTask from "../draftsComponent/drafts";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/store-helper/appActions";

const transformToDate = (IsoDate) => {
  const dateObj = new Date(IsoDate);
  return `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;
};

function CollapsedTask({ task, assignUsers, user }) {
  const [edit, setedit] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      {edit ? (
        <NewTask
          setEdit={setedit}
          isEdit={true}
          task={task}
          user={user}
          assignUsers={assignUsers}
        />
      ) : (
        <div className="collapsed-task">
          <div className="left-section">
            <img src={task.assignUsers.icon} alt="user"></img>
            <div className="description-wrapper">
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                className="description"
              >
                {task.description}
              </span>
              <span className="date-time">
                {transformToDate(task.date)}
                {task.time ? "at " + task.time : ""}
              </span>
            </div>
          </div>
          <div className="right-section">
            <div>
              <Tippy className="font-small" content={"Edit this task"}>
                <button
                  onClick={() => {
                    setedit(true);
                  }}
                  className="edit-button"
                ></button>
              </Tippy>
              <Tippy
                className="font-small"
                content={
                  task.completed
                    ? "Mark this Task as Incomplete"
                    : "Mark this task as Complete"
                }
              >
                <button
                  onClick={() => {
                    dispatch(
                      updateTask({ ...task, completed: !task.completed })
                    );
                  }}
                  className={task.completed ? "done-button" : "archive-button"}
                ></button>
              </Tippy>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CollapsedTask;
