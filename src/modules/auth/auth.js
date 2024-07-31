import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import dotenv from 'dotenv';
import { findByOid, saveUser } from '../user/service.js'

dotenv.config();

passport.use(
    new OIDCStrategy(
        {
            identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
            clientID: process.env.AZURE_CLIENT_ID,
            responseType: 'code id_token',
            responseMode: 'form_post',
            redirectUrl: process.env.REDIRECT_URI,
            allowHttpForRedirectUrl: process.env.ALLOW_HTTP_REDIRECT_URL,
            clientSecret: process.env.AZURE_CLIENT_SECRET,
            issuer: process.env.ISSUER,
            passReqToCallback: process.env.PASS_REQ_TO_CALL_BACK,
            scope: ['profile', 'email', 'openid', 'User.Read'],
            loggingLevel: process.env.LOGGING_LEVEL,
            nonceLifetime: process.env.NONCE_LIFE_TIME,
            nonceMaxAmount: process.env.NONCE_MAX_AMOUNT,
        },
        (profile, done) => {
            if (!profile.oid) {
                return done(new Error("No oid found"), null);
            }
            process.nextTick(() => {
                findByOid(profile.oid, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        saveUser(profile);
                        return done(null, profile);
                    }
                    return done(null, user);
                });
            });
        }
    )
);