import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config";
import AppError from "../app/error/AppError";
import catchAsync from "../app/utils/catchAsync";

type TRole = "Admin" | "Student";
const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "unAuthorized user! Token not found",
      );
    }

    try {
      const decode = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { role, userId, phone } = decode;
      if (!requiredRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "unAuthorized user role!");
      }

      (req as any).user = decode;
      next();
    } catch (error: any) {
      throw new AppError(httpStatus.UNAUTHORIZED, error.message);
    }
  });
};

export default auth;
