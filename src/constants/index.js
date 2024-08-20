export const HttpStatusCodes = {
  OK: { code: 200, text: "Success" },
  CREATED: { code: 201, text: "Created" },
  NO_CONTENT: { code: 202, text: "No Content" },
  BAD_REQUEST: { code: 400, text: "Bad Request" },
  UNAUTHORIZED: { code: 401, text: "Unauthorized" },
  FORBIDDEN: { code: 403, text: "Forbidden" },
  NOT_FOUND: { code: 404, text: "Not Found" },
  PRE_CONDITION_FAIL: { code: 412, text: "Pre-Condition Failed" },
  UNPROCESSABLE_ENTITY: { code: 422, text: "UnProcessable Entity" },
  INTERNAL_SERVER_ERROR: { code: 500, text: "Something Went Wrong! Please try again after sometime." },
  SEVER_NOT_AVAILABLE: { code: 503, text: "Service Not Available" },
  CONNECTIONABORTED: { code: 503, text: "ECONNABORTED" },
};

export const responseStrings = {
  // Auth Messages
  missingAuthorization: "Authorization header is missing.",
  invalidToken: "The provided token is invalid.",
  unsupportedAuthType: "The authentication type used is not supported.",

  // Common Messages
  missingPayload: "Missing values in payload.",

  // User Messages
  userAlreadyExistErrorMessage: "User already exist in database.",
  createUserSuccessMessage: "The user has been successfully created.",
  createUserErrorMessage: "An error occurred while trying to create the user. Please try again later.",
  getAllUserSuccessMessage: "All Users has been fetched successfully.",
  getAllUserErrorMessage: "An error occurred while trying to fetch the users. Please try again later.",

  // Idea Messages
  createIdeaErrorMessage: "An error occurred while trying to create the idea. Please try again later.",
  createIdeaSuccessMessage: "The idea has been successfully created.",
  getAllIdeaSuccessMessage: "All Ideas has been fetched successfully.",
  getAllIdeaErrorMessage: "An error occurred while trying to fetch the ideas. Please try again later.",
  ideaNotFoundErrorMessage: "An Idea with given id not Found.",
  getIdeaByIdSuccessMessage: "An Idea with given id has been fetched successfully.",
  getIdeaByIdErrorMessage: "An error occurred while trying to fetch the idea with given id. Please try again later.",
  updateIdeaSuccessMessage: "An Idea with given id has been updated successfully.",
  updateIdeaErrorMessage: "An error occurred while trying to update the idea with given id. Please try again later.",
  deleteIdeaSuccessMessage: "An Idea with given id has been deleted successfully.",
  deleteIdeaErrorMessage: "An error occurred while trying to delete the idea with given id. Please try again later.",
  filterIdeaSuccessMessage: "All Ideas according to applied filters has been fetched successfully.",
  filterIdeaErrorMessage: "An error occurred while trying to fetch the ideas with given filters. Please try again later.",

  // Stage Messages
  createStageSuccessMessage: "The Stage has been successfully created.",
  createStageErrorMessage: "An error occurred while trying to create the stage. Please try again later.",
  getAllStageSuccessMessage: "All Stages has been fetched successfully.",
  getAllStageErrorMessage: "An error occurred while trying to fetch all the stages. Please try again later.",
  stageNotFoundErrorMessage: "A Stage with given id not Found.",
  getStageByIdSuccessMessage: "A Stage with given id has been fetched successfully.",
  getStageByIdErrorMessage: "An error occurred while trying to fetch the stage with given id. Please try again later.",
  updateStageSuccessMessage: "A Stage with given id has been updated successfully.",
  updateStageErrorMessage: "An error occurred while trying to update the stage with given id. Please try again later.",
  deleteStageSuccessMessage: "A Stage with given id has been deleted successfully.",
  deleteStageErrorMessage: "An error occurred while trying to delete the stage with given id. Please try again later.",
  getStageCountErrorMessage: "Unable to find count for given stage id.",
  getStageCountSuccessMessage: "Found count for given Stage id.",


  // Vertical Messages
  createVerticalSuccessMessage: "The Vertical has been successfully created.",
  createVerticalErrorMessage: "An error occurred while trying to create the vertical. Please try again later.",
  getAllVerticalSuccessMessage: "All Vertical has been fetched successfully.",
  getAllVerticalErrorMessage: "An error occurred while trying to fetch all the categories. Please try again later.",
  verticalNotFoundErrorMessage: "A Vertical with given id not Found.",
  getVerticalByIdSuccessMessage: "A Vertical with given id has been fetched successfully.",
  getVerticalByIdErrorMessage: "An error occurred while trying to fetch the vertical with given id. Please try again later.",
  updateVerticalSuccessMessage: "A Vertical with given id has been updated successfully.",
  updateVerticalErrorMessage: "An error occurred while trying to update the Vertical with given id. Please try again later.",
  deleteVerticalSuccessMessage: "A Vertical with given id has been deleted successfully.",
  deleteVerticalErrorMessage: "An error occurred while trying to delete the vertical with given id. Please try again later.",
  getVerticalCountErrorMessage: "Unable to find count for given Vertical id.",
  getVerticalCountSuccessMessage: "Found count for given Vertical id.",


  // Function Messages
  createFunctionSuccessMessage: "The Function has been successfully created.",
  createFunctionErrorMessage: "An error occurred while trying to create the function. Please try again later.",
  getAllFunctionSuccessMessage: "All Functions has been fetched successfully.",
  getAllFunctionErrorMessage: "An error occurred while trying to fetch all the functions. Please try again later.",
  functionNotFoundErrorMessage: "A Function with given id not Found.",
  getFunctionByIdSuccessMessage: "A Function with given id has been fetched successfully.",
  getFunctionByIdErrorMessage: "An error occurred while trying to fetch the function with given id. Please try again later.",
  updateFunctionSuccessMessage: "A Function with given id has been updated successfully.",
  updateFunctionErrorMessage: "An error occurred while trying to update the function with given id. Please try again later.",
  deleteFunctionSuccessMessage: "A Function with given id has been deleted successfully.",
  deleteFunctionErrorMessage: "An error occurred while trying to delete the function with given id. Please try again later.",

  // Subdivision Messages
  createSubdivisionSuccessMessage: "The Subdivision has been successfully created.",
  createSubdivisionErrorMessage: "An error occurred while trying to create the subdivision. Please try again later.",
  getAllSubdivisionSuccessMessage: "All Subdivision has been fetched successfully.",
  getAllSubdivisionErrorMessage: "An error occurred while trying to fetch all the subdivisions. Please try again later.",
  subdivisionNotFoundErrorMessage: "A Subdivision with given id not Found.",
  getSubdivisionByIdSuccessMessage: "A Subdivision with given id has been fetched successfully.",
  getSubdivisionByIdErrorMessage: "An error occurred while trying to fetch the subdivision with given id. Please try again later.",
  updateSubdivisionSuccessMessage: "A Subdivision with given id has been updated successfully.",
  updateSubdivisionErrorMessage: "An error occurred while trying to update the subdivision with given id. Please try again later.",
  deleteSubdivisionSuccessMessage: "A Subdivision with given id has been deleted successfully.",
  deleteSubdivisionErrorMessage: "An error occurred while trying to delete the subdivision with given id. Please try again later.",
  getSubdivisionByFunctionIdSuccessMessage: "A Subdivisions associated function id has been fetched successfully.",
  getSubdivisionByFunctionIdErrorMessage: "An error occurred while trying to fetch the subdivisions with given function id. Please try again later.",

  // Audit Log Error Message
  auditLogNotFoundErrorMessage: "Unable to find Audit log for given Idea Id."
};
