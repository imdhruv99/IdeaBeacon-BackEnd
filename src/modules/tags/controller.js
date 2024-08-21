import { getAllTags } from "./service.js";
import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";


// Read All Tags
export const getAllTagsController = async (req, res) => {
    try {
        const tags = await getAllTags();
        res
            .status(HttpStatusCodes.OK.code)
            .json({ status: true, message: responseStrings.getAllTagsSuccessMessage, data: tags });
    } catch (error) {
        logger.error(`Error fetching tags: ${error.message}`);
        res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
            .json({ status: false, message: responseStrings.getAllTagsErrorMessage });
    }
};
