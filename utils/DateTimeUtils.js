export const combineDateTime = (dateObj, timeObj) => {
  // Get date components from the first Date object
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  // Get time components from the second Date object
  const hours = timeObj.getHours();
  const minutes = timeObj.getMinutes();
  const seconds = timeObj.getSeconds();
  // Create a new Date object with combined date and time components
  const combinedDateTime = new Date(year, month, day, hours, minutes, seconds);

  return combinedDateTime;
};

export const getTimeDifferenceInHours = (startDate, endDate) => {
  // Get the time difference in milliseconds
  const timeDifferenceMs = endDate - startDate;
  // Calculate the time difference in hours
  const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);
  // Round the result to handle any potential fractional hours
  return Math.abs(Math.round(hoursDifference));
};
