import React, { useRef, useState, useEffect } from "react";
import { noMatches } from "./drafts.service";

// To show the list of all assigned users when the assigned user button is clicked
function AllAssignedUsersList({
  user,
  setAssignedUser,
  setHideUsersList,
  assignedUserPrev,
  onChange,
}) {
  return (
    <li
      onClick={() => {
        setAssignedUser(user.name);
        setHideUsersList(true);
        onChange(user);
      }}
    >
      <span
        className={`tick-mark-user ${
          user.name === assignedUserPrev.current ? "tick-bg" : ""
        }`}
      ></span>
      {user.name}
    </li>
  );
}

// Assigned users Search list when the when input value changes
function AssignedUsersSearchList({
  asUser,
  user,
  setAssignedUser,
  setHideUsersList,
  assignedUserPrev,
  onChange,
}) {
  return (
    <>
      {user.name.toLowerCase().indexOf(asUser.toLowerCase()) !== -1 ? (
        <AllAssignedUsersList
          asUser={asUser}
          user={user}
          setAssignedUser={setAssignedUser}
          setHideUsersList={setHideUsersList}
          assignedUserPrev={assignedUserPrev}
          onChange={onChange}
        />
      ) : (
        <> </>
      )}
    </>
  );
}

function AssignUser({ user, assignUsers, onChange }) {
  const assignedUserPrev = useRef("");
  const [asUser, setAssignedUser] = useState(
    user?.name ? user.name : assignUsers[0]?.name ? assignUsers[0].name : ""
  );
  const [hideUsersList, setHideUsersList] = useState(true);

  useEffect(() => {
    assignedUserPrev.current = asUser;
  }, [asUser]);

  return (
    <>
      <label htmlFor="assign-user-input">Assign User</label>
      <input
        id="assign-user-input"
        className="assign-user-input"
        type="text"
        name="user"
        value={asUser}
        onClick={() => {
          setAssignedUser("");
          setHideUsersList(false);
        }}
        onChange={() => {}}
      />
      <div className="input-icon"></div>

      <div className={`assign-user-list ${hideUsersList ? "d-none" : ""}`}>
        <ul>
          <>
            {asUser === "" &&
              assignUsers.map((user, index) => (
                <React.Fragment key={index}>
                  {asUser === "" ? (
                    <AllAssignedUsersList
                      asUser={asUser}
                      user={user}
                      setAssignedUser={setAssignedUser}
                      setHideUsersList={setHideUsersList}
                      assignedUserPrev={assignedUserPrev}
                      onChange={onChange}
                    />
                  ) : (
                    <AssignedUsersSearchList
                      asUser={asUser}
                      user={user}
                      setAssignedUser={setAssignedUser}
                      setHideUsersList={setHideUsersList}
                      assignedUserPrev={assignedUserPrev}
                      onChange={onChange}
                    />
                  )}
                </React.Fragment>
              ))}

            {asUser !== "" && !noMatches(assignUsers, asUser) && (
              <li>No Matches</li>
            )}
          </>
        </ul>
      </div>
    </>
  );
}

export default AssignUser;
