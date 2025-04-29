export const cleanObject = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
    if (obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const throwError = (message, code = 500) => {
  const err = {
    code,
    message,
  };
  throw err;
};


export const pick = (object: object, keys: string[]): object => {
  return keys.reduce((obj, key): object => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const validateObjectId = (value, helpers) : string => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
   return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
 };