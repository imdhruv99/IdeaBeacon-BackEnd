import { HttpStatusCodes } from "../../constants/index.js";
import { ConfidentialClientApplication } from '@azure/msal-node';
import authPassport from "./auth.js";
import { findByOid, createUser } from "../user/service.js";
import logger from "../../utils/logger.js";

const cca = new ConfidentialClientApplication(authPassport);

export const loginController = (req, res) => {
    const authCodeUrlParameters = {
        scopes: ['profile', 'email', 'openid', 'User.Read'],
        redirectUri: "http://localhost:5000/api/ideabeacon/auth/v1/callback",
    };

    // Get the auth code URL asynchronously
    cca.getAuthCodeUrl(authCodeUrlParameters)
        .then((response) => {
            // Redirect user to Azure AD login page
            res.redirect(response);
        })
        .catch((error) => {
            logger.error('Error during login:', error.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Error during login");
        });
}

export const callbackController = async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ['profile', 'email', 'openid', 'User.Read'],
        redirectUri: "http://localhost:5000/api/ideabeacon/auth/v1/callback",
    };

    try {
        // Acquire access token using authorization code
        const response = await cca.acquireTokenByCode(tokenRequest);

        if (!response) {
            logger.error("No Response found")
        }

        // Extract the JWT token from the response
        const jwtToken = response.idToken; // Assuming the ID token is what you need

        const profile = {
            preferredUsername: response.idTokenClaims.preferred_username,
            name: response.idTokenClaims.name,
            oid: response.idTokenClaims.oid,
            role: '66ab0d56e27786913f340a8b'
        };
        
        const isUser = await findByOid(profile.oid);
        if (!isUser) {
            await createUser(profile);
        }
        res.json({ token: jwtToken, userInfo: profile, status: HttpStatusCodes.OK});
    } catch (error) {
        logger.error('Error during token acquisition:', error.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Error during token acquisition');
    }
}