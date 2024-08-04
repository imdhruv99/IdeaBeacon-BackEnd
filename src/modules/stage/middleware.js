import { HttpStatusCodes } from "../../constants/index.js";

export const validateCreateStageRequestBody = (req, res, next) => {
  const { stageName } = req.body;

  if (!stageName) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST.code)
      .json({ error: "Stage name is not null/undefiend/empty string" });
  }

  next();
};

export const validateUpdateStageRequestBody = (req, res, next) => {
  const { stageName } = req.body;

  if (!stageName) {
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({ error: `Missing required body param: "stageName"` });
  }

  next();
};
