import passport from "passport";
import { Issuer, Strategy } from 'openid-client';
import { BearerStrategy } from "passport-azure-ad";
import dotenv from 'dotenv';
import { findByOid, saveUser } from '../user/service.js'

dotenv.config();


// const authPassport = passport.use(
//     new BearerStrategy(
//         {
//             identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
//             clientID: process.env.AZURE_CLIENT_ID,
//             // responseType: 'code id_token',
//             // responseMode: 'form_post',
//             // redirectUrl: process.env.REDIRECT_URI,
//             // allowHttpForRedirectUrl: true,
//             // clientSecret: process.env.AZURE_CLIENT_SECRET,
//             issuer: [`https://sts.windows.net/${process.env.AZURE_AD_TENANT_ID}/`],
//             passReqToCallback: process.env.PASS_REQ_TO_CALL_BACK,
//             scope: ['profile', 'email', 'openid', 'User.Read'],
//             loggingLevel: process.env.LOGGING_LEVEL,
//             // nonceLifetime: null,
//             // nonceMaxAmount: 5,
//             loggingNoPII: false,
//             validateIssuer: true,
//         },
//         (profile, done) => {
//             console.log("--->", profile);
//             if (!profile.oid) {
//                 return done(new Error("No oid found"), null);
//             }
//             process.nextTick(() => {
//                 findByOid(profile.oid, (err, user) => {
//                     if (err) {
//                         return done(err);
//                     }
//                     if (!user) {
//                         saveUser(profile);
//                         return done(null, profile);
//                     }
//                     return done(null, user);
//                 });
//             });
//         }
//     )
// );

// export default authPassport;


const authPassport = {
    auth: {
        clientId: process.env.AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                console.log(message);
            },
            piiLoggingEnabled: false,
            loggingLevel: process.env.LOGGING_LEVEL,
        }
    }
};

export default authPassport;