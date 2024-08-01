export const isEmpty = (data) => {
  const emptyDataIdentifiers = [null, 0, "", undefined, "undefined", false, "0"];
  if (emptyDataIdentifiers.includes(typeof data)) {
    return true;
  }
  if (emptyDataIdentifiers.includes(data)) {
    return true;
  }
  if (typeof data === "object") {
    const keys = Object.keys(data);
    if (!keys.length) {
      return true;
    }
  }
  return false;
};


export const exceptionHandler = (message, error) => {
  throw new Error(message);
}