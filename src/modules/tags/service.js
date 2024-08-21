import Tag from '../../models/tagModel.js';
import logger from '../../utils/logger.js';

export const createTags = async (tagNames) => {
    const tagIds = [];
    for (const tagName of tagNames) {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
            logger.info("Creating all tags");
            tag = await Tag.create({ name: tagName });
        }
        tagIds.push(tag._id);
    }
    return tagIds;
};


// Read All Tags
export const getAllTags = async () => {
    logger.info("Fetching all tags");
    try {
        return await Tag.find();
    } catch (err) {
        logger.error(`Error fetching tags: ${err}`);
        throw err;
    }
};
