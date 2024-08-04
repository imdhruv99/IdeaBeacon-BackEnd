import { HttpStatusCodes } from "../../constants/index.js";

export const validateFilterIdeaRequestBody = (req, res, next) => {
  const { stage, category, author, function: func, subdivision, month, year } = req.body;

  // Add any specific validation rules here
  if (month && (month < 1 || month > 12)) {
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({ error: "Month must be between 1 and 12" });
  }
  if (year && (year < 1900 || year > new Date().getFullYear())) {
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({ error: "Year is out of valid range" });
  }

  next();
};
