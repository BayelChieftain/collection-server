import ApiError from "../exceptions/apiError.js";


export default function (requiredRole) {
    return (req, res, next) => {
      try {

        const userRole = req.user.role;
        if (userRole !== requiredRole) {
          return next(ApiError.BadRequest('You do not have the required privileges to access this resource.'));
        }
  
        next();
      } catch (e) {
        return next(ApiError.BadRequest('You do not have the required privileges to access this resource.'));
      }
    };
  }