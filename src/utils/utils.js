export const isEmpty = (data) => {
  // Check for null or undefined
  if (data == null) {
    return true;
  }

  // Check for empty string, number 0, or boolean false
  if (data === "" || data === 0 || data === false) {
    return true;
  }

  // Check if it's an empty array
  if (Array.isArray(data) && data.length === 0) {
    return true;
  }

  // Check if it's an empty object
  if (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0) {
    return true;
  }

  // Data is not empty
  return false;
};


export const exceptionHandler = (message, error) => {
  throw new Error(message);
}