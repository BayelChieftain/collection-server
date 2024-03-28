import { User } from "../models/userModel.js";
import ApiError from "../exceptions/apiError.js";

export default async function (req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    req.user.role = user.role;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
