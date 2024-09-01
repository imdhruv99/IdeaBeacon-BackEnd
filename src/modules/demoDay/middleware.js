import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

// Validate Create DemoDay Request Body
export const validateCreateDemoDay = async (req, res, next) => {
    const { number, year } = req.body;

    if (isEmpty(number) || isEmpty(year)) {
        logger.error("Bad request at demoDay/middleware.validateCreateDemoDay: Missing required fields");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }

    if (year < 2014 || year > new Date().getFullYear()) {
        logger.error("Bad request at demoDay/middleware.validateCreateDemoDay: Invalid year");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: "Year is out of valid range",
        });
    }

    next();
};

// Validate Update DemoDay Request Body
export const validateUpdateDemoDay = async (req, res, next) => {
    const { number, year, isCurrent } = req.body;
    const { id } = req.params;

    if (isEmpty(id)) {
        logger.error("Bad request at demoDay/middleware.validateUpdateDemoDay: Missing DemoDay ID");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }

    if (isEmpty(number) && isEmpty(year) && typeof isCurrent !== "boolean") {
        logger.error("Bad request at demoDay/middleware.validateUpdateDemoDay: Missing fields to update");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }

    if (year && (year < 1900 || year > new Date().getFullYear())) {
        logger.error("Bad request at demoDay/middleware.validateUpdateDemoDay: Invalid year");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: "Year is out of valid range",
        });
    }

    next();
};

// Validate ID Parameter
export const validateDemoDayID = async (req, res, next) => {
    const { id } = req.params;

    if (isEmpty(id)) {
        logger.error("Bad request at demoDay/middleware.validateDemoDayID: Missing DemoDay ID");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }

    next();
};

// Validate Query for Current DemoDay
export const validateCurrentDemoDayQuery = async (req, res, next) => {
    if (req.query.isCurrent !== undefined && req.query.isCurrent !== "true" && req.query.isCurrent !== "false") {
        logger.error("Bad request at demoDay/middleware.validateCurrentDemoDayQuery: Invalid isCurrent query parameter");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: "Invalid isCurrent query parameter",
        });
    }

    next();
};
