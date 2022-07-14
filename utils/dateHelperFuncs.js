const getCurrentDateTime = () => {
  const currentDateTimeObj = new Date();

  const month = currentDateTimeObj.getMonth() + 1;
  const year = currentDateTimeObj.getFullYear();
  const date = currentDateTimeObj.getDate();
  const hours = currentDateTimeObj.getHours();
  const minutes = currentDateTimeObj.getMinutes();
  const seconds = currentDateTimeObj.getSeconds();

  const currentDate = `${year}-${month.toString().length === 2 ? "" : 0}${month}-${
    date.toString().length === 2 ? "" : 0
  }${date}`;

  const currentTime24h = `${hours.toString().length === 2 ? "" : 0}${hours}:${
    minutes.toString().length === 2 ? "" : 0
  }${minutes}:${seconds.toString().length === 2 ? "" : 0}${seconds}`;

  return { currentDate, currentTime24h };
};

const convertTime24hto12h = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  return time.join(""); // return adjusted time or original string
};

const convertTime12hto24h = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = parseInt(hours, 10) + 12;

  return `${hours}:${minutes}`;
};

module.exports = { getCurrentDateTime, convertTime24hto12h, convertTime12hto24h };
