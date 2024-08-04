import { HttpStatusCodes } from "../../constants/index.js";

export const validateCreateSubdivisionRequestBody = (req, res, next) => {
  const { subdivisionName } = req.body;

  if (!subdivisionName) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST.code)
      .json({ error: "Subdivision name is not null/undefiend/empty string" });
  }

  next();
};

export const validateUpdateSubdivisionRequestBody = (req, res, next) => {
  const { subdivisionName } = req.body;

  if (!subdivisionName) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST.code)
      .json({ error: `Missing required body param: "subdivisionName"` });
  }

  next();
};
