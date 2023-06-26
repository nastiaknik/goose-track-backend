const { isValid, parse } = require("date-fns");
const HttpError = require("../helpers/HttpError");

const validateMonthAndYear = (req, res, next) => {
  const { month, year } = req.params;

  const date = parse(`${year}-${month}`, "yyyy-MM", new Date());

  if (isValid(date)) {
    next();
  } else {
    next(new HttpError(400, "Invalid month or year"));
  }
};

const validateDate = (req, res, next) => {
  const { year, month, day } = req.params;

  const parsedYear = parseInt(year, 10);
  const parsedMonth = parseInt(month, 10);
  const parsedDay = parseInt(day, 10);

  const date = parse(
    `${parsedYear}-${parsedMonth.toString().padStart(2, "0")}-${parsedDay
      .toString()
      .padStart(2, "0")}`,
    "yyyy-MM-dd",
    new Date()
  );

  if (isValid(date)) {
    next();
  } else {
    next(new HttpError(400, "Invalid day"));
  }
};

module.exports = {
  validateMonthAndYear,
  validateDate,
};
