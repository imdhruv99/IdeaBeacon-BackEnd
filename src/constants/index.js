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