// EDITED BY CODEX
export function isEmptyObject(object) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return false;
  }

  const values = Object.values(object);

  if (values.length === 0) {
    return false;
  }

  return values.every((value) => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every((item) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          return isEmptyObject(item);
        }

        if (typeof item === "string") {
          return item.trim().length > 0;
        }

        return item !== null && item !== undefined;
      });
    }

    if (typeof value === "object") {
      return isEmptyObject(value);
    }

    return true;
  });
}
