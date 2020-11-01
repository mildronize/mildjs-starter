export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const assignObject = (target: any, source: any) => {
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
  return target;
};
