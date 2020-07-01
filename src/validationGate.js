export default validations => () => next => action => {
  if (!validations[action.type]) {
    next(action);
  } else {
    const validation = new validations[action.type]();
    validation
      .validate(action.payload)
      .then(() => {
        validation.accept(action.type);
        next(action);
      })
      .catch(e => {
        console.error(e);
        validation.reject(action.type);
      });
  }
};
