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
