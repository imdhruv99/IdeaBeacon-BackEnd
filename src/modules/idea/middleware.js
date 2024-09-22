import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

export const validateBody = async (req, res, next) => {
    const createIdea = req.body;

    if (
        isEmpty(createIdea) ||
        isEmpty(createIdea.ideaVerticalId) ||
        isEmpty(createIdea.title) ||
        isEmpty(createIdea.problemStatement) ||
        isEmpty(createIdea.advantage) ||
        isEmpty(createIdea.proposedSolution) ||
        isEmpty(createIdea.existingSolution) ||
        isEmpty(createIdea.functionId) ||
        isEmpty(createIdea.demoDayId) ||
        !Array.isArray(createIdea.tags) ||
        createIdea.tags.length === 0
    ) {
        logger.error("Bad request at idea/middlewares.createIdea: Missing or invalid field");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }

    next();
};

export const validateID = async (req, res, next) => {
    let { id } = req.params;
    if (isEmpty(id)) {
        logger.error("Bad request at idea/middlewares.get-idea-by-id");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    } else {
        next();
    }
};

export const validateRequestBodyToUpdate = async (req, res, next) => {
    const updateIdea = req.body;
    const { id } = req.params;

    if (isEmpty(id) || isEmpty(updateIdea)) {
        logger.error("Bad request at idea/middlewares.update-idea");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }
    next();
};

export const validateDeleteParam = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        logger.error("Bad request at idea/middlewares.delete-idea");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
            status: false,
            message: responseStrings.missingPayload,
        });
    }

    next();
};
