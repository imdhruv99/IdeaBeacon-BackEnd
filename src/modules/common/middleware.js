import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';
import { HttpStatusCodes, responseStrings } from "../../constants/index.js";

dotenv.config();

const JWT_ISSUER = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`;
const JWT_AUDIENCE = process.env.AZURE_CLIENT_ID;

// Create a JWKS client
const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`
});

// Function to get the signing key for the JWT
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
};

// Middleware to authenticate requests
export const authenticate = (req, res, next) => {
  // Check if Authorization header is present and properly formatted
  if (!req.headers.authorization || req.headers.authorization.indexOf(" ") === -1) {
    return res.status(HttpStatusCodes.UNAUTHORIZED.code).json({
      status: false,
      message: responseStrings.missingAuthorization,
    });
  }

  const [authType, token] = req.headers.authorization.split(" ");

  if (authType.toLowerCase() === 'bearer') {
    jwt.verify(token, getKey, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        return res.status(HttpStatusCodes.UNAUTHORIZED.code).json({
          status: false,
          message: responseStrings.invalidToken,
        });
      }

      req.user = decoded;
      // console.log("--->", req.user);
      next();
    });
  } else {
    return res.status(HttpStatusCodes.UNAUTHORIZED.code).json({
      status: false,
      message: responseStrings.unsupportedAuthType,
    });
  }
};
