import { HttpStatusCodes } from "../../constants/index.js";

export const validateCreateFunctionRequestBody = (req, res, next) => {
  const { functionName } = req.body;

  if (!functionName) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST.code)
      .json({ error: "Function name is not null/undefiend/empty string" });
  }

  next();
};

export const validateUpdateFunctionRequestBody = (req, res, next) => {
  const { functionName } = req.body;

  if (!functionName) {
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({ error: `Missing required body param: "functionName"` });
  }

  next();
};
