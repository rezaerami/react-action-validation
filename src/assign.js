export default types => validator => {
  if (Array.isArray(types)) {
    return types.reduce((result, current) => {
      // eslint-disable-next-line no-param-reassign
      result[current] = validator;
      return result;
    }, {});
  }
  return { [types]: validator };
};
