export const getTime = (dateString) => {
  const dateObject = new Date(dateString);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDateTimeString = dateObject.toLocaleString("en-US", options);
  return formattedDateTimeString;
};
