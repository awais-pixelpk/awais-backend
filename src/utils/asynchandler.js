const asynchandler = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch((err) => next());
};

export { asynchandler };

// another way same code but using try catch block
/*const asynchandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      sucess: false,
      message: err.message,
    });
  }
};*/
