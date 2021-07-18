export const timeGenerator = () => {
  const amTime = [];
  const pmTime = [];

  Array(11)
    .fill("")
    .forEach((val, index) => {
      amTime.push(`${index + 1}:00 am`);
      amTime.push(`${index + 1}:30 am`);
    });
  amTime.unshift("12:30 am");
  amTime.unshift("12:00 am");

  amTime.push("12:00 pm");
  amTime.push("12:30 am");

  Array(11)
    .fill("")
    .forEach((val, index) => {
      pmTime.push(`${index + 1}:00 pm`);
      pmTime.push(`${index + 1}:30 pm`);
    });

  return amTime.concat(pmTime);
};

export const noMatches = (assignedUsers, userName) => {
  return assignedUsers.find(
    (user) => user.name.toLowerCase().indexOf(userName.toLowerCase()) !== -1
  );
};

export const getEditData = (data) => {
  const dateArr = data.date.split("/");
  const newDate = `${dateArr[0]}/${Number(dateArr[1]) + 1}/${dateArr[2]}`;
  return { ...data, date: newDate };
};

export const getAddData = (data) => {
  const dateArr = data.date.indexOf("Z") === -1 ? data.date.split("/") : null;
  const newDate =
    data.date.indexOf("Z") !== -1
      ? `${new Date(data.date).getDate()}/${
          new Date(data.date).getMonth() + 1
        }/${new Date(data.date).getFullYear()}`
      : `${dateArr[0]}/${Number(dateArr[1]) + 1}/${dateArr[2]}`;
  return { ...data, date: newDate };
};

export const getInitialDate = (date) => {
  const dateArr = date
    ? date.split("/")
    : [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()];

  return date
    ? new Date(Number(dateArr[2]), Number(dateArr[1]) - 1, Number(dateArr[0]))
    : new Date();
};

export const getCurrentTimeWithOffset = () => {
  const dateTimeString = new Date().toLocaleDateString("en-Us", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  const timeString = dateTimeString.toLowerCase().split(",")[1].trim();
  const hr12 = timeString.split(" ")[1];
  const hour = timeString.split(" ")[0].split(":")[0];
  const minuteString = timeString.split(" ")[0].split(":")[1];
  const offset = Number(minuteString) % 30;

  return `${hour.padStart(2, 0)}:${String(
    Number(minuteString) - offset
  ).padStart(2, 0)} ${hr12}`;
};
