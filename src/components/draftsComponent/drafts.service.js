export const timeGenerator = () => {
  const amTime = [];
  const pmTime = [];

  Array(11)
    .fill("")
    .forEach((val, index) => {
      amTime.push(`${index + 1}:00am`);
      amTime.push(`${index + 1}:30am`);
    });
  amTime.unshift("12:30am");
  amTime.unshift("12:00am");

  amTime.push("12:00pm");
  amTime.push("12:30am");

  Array(11)
    .fill("")
    .forEach((val, index) => {
      pmTime.push(`${index + 1}:00pm`);
      pmTime.push(`${index + 1}:30pm`);
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
