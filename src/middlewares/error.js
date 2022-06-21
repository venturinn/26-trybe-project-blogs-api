// const getStatusCode = (type) => {
//     if (type === 'any.required' || type === 'string.empty') return 400;
//   };
  
  module.exports = (err, _req, res, _next) => {
    if (err.isJoi) {
     // const { type } = err.details[0];
     // const statusCode = getStatusCode(type);
     // return res.status(statusCode).json({ message: err.details[0].message });
     // return res.status(400).json({ message: 'Some required fields are missing' });
     return res.status(400).json({ message: err.details[0].message });
    }
  
    const statusByErrorCode = {
     // notFound: 404,
      userAlreadyRegistered: 409,
      invalidFields: 400,
    };
  
    const status = statusByErrorCode[err.code] || 500;
  
    res.status(status).json({ message: err.message });
  };