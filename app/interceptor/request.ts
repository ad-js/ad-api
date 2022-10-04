export const success = ({ message, res }) => {
  return {
    code: 200,
    message,
    res,
  };
};

export const error = ({ message }) => {
  return {
    code: 400,
    message,
  };
};
