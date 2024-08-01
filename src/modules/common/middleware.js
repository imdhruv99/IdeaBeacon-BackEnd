import jwt from 'jsonwebtoken';
import { isEmpty } from '../../utils/utils.js';
import { HttpStatusCodes } from "../../constants/index.js";
import dotenv from dotenv;

dotenv.config();

const allowedAPIs = [
  "/api/ideabeacon/health-check/liveness",
  "/api/ideabeacon/auth/v1/login",
];

const JWT_SECRET = process.env.JWT_SECRET 

export const authenticate = async (req, res, next) => {
  // Check if the requested URL is in the allowed APIs list
  if (allowedAPIs.indexOf(req.url) !== -1) {
      return next();
  }

  // Check if Authorization header is present and properly formatted
  if (isEmpty(req.headers.authorization) || req.headers.authorization.indexOf(" ") === -1) {
      return res.status(HttpStatusCodes.UNAUTHORIZED.code).json({
          status: false,
          message: responseStrings.missingAuthorization,
      });
  }

  const [authType, token] = req.headers.authorization.split(" ");

  if (authType.toLowerCase() === 'bearer') {
      // JWT authentication
      try {
          const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
          return next();
      } catch (err) {
          return res.status(HttpStatusCodes.UNAUTHORIZED.code).json({
              status: false,
              message: responseStrings.invalidToken,
          });
      }
  } else {
      return res.status(HttpStatusCodes.UNAUTHORIZED.code).json({
          status: false,
          message: responseStrings.unsupportedAuthType,
      });
  }
};