import { headers } from "../../App.config";

const get12HourTime = (timeElapsed) => {
  const dateObj = new Date(timeElapsed * 1000);
  let hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
  const hr12 = Number(hours) > 12 ? "pm" : "am";
  if (Number(hours) === 0) {
    hours = "12";
  } else if (hr12 === "pm") {
    hours = `${Number(hours) - 12}`;
  }

  return `${hours.padStart(2, 0)}:${minutes.padStart(2, 0)} ${hr12}`;
};

const getIsoStringForStore = (utcDateString) => {
  if (utcDateString.length) {
    return utcDateString + "Z";
  } else {
    return new Date(utcDateString.$date).toISOString();
  }
};

const getAssignedUser = (userId, assignedUsersList) => {
  return assignedUsersList.find((user) => user.user_id == userId);
};

export const getTaskDateFormat = (utcdate) => {
  const dateStr = new Date(utcdate).toLocaleDateString("en-US", {}).split("/");

  return `${dateStr[2]}-${dateStr[0].padStart(2, 0)}-${dateStr[1].padStart(
    2,
    0
  )}`;
};

export const getTasTimeInSeconds = (time) => {
  return (
    (new Date(`${new Date().toDateString()} ${time}`) -
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )) /
    1000
  );
};

export const getHeadersWithToken = (token) => {
  return {
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
  };
};

const newTaskForStore = (task, assignUsers) => {
  return {
    id: task.id,
    description: task.task_msg,
    date: getIsoStringForStore(task.task_date_time_in_utc),
    time: get12HourTime(task.task_time),

    completed: task.is_completed,
    assignUsers: getAssignedUser(task.assigned_user, assignUsers),
  };
};

export const getApiToStoreTransformation = (taskApiResponse, assignUsers) => {
  let tasksForStore = [];
  const results = taskApiResponse?.data?.results;

  if (results.length) {
    results.forEach((task) => {
      const newTask = newTaskForStore(task, assignUsers);
      tasksForStore.push(newTask);
    });
  } else {
    return [newTaskForStore(results, assignUsers)];
  }

  return tasksForStore;
};

export const getStoreToApiTransformation = (taskDataStore) => {
  return {
    assigned_user: taskDataStore.assignUsers.user_id,
    task_date: getTaskDateFormat(taskDataStore.date),
    task_time: getTasTimeInSeconds(taskDataStore.time),
    is_completed: Number(taskDataStore.completed),
    time_zone: -new Date().getTimezoneOffset() * 60,
    task_msg: taskDataStore.description,
  };
};
