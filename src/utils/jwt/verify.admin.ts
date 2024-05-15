import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserData } from '../interfaces/interfaces'

interface CustomRequest extends Request {
  user?: UserData;
}

export const verifyAdmin: RequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const adminAccessToken = req.cookies.adminAccessToken;

  if (!adminAccessToken) {
    return res.status(401).json({ status: false, message: "Invalid Access token" });
  }

  jwt.verify(
    adminAccessToken,
    process.env.ACCESS_SECRET_KEY || "",
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        console.log("JWT Verification Error:", err);
        return res.status(401).json({
          status: false,
          message: "Unauthorized - Invalid token",
        });
      } else {
        const decodedUser = decoded.user as UserData;
        req.user = decodedUser;
        next();
      }
    }
  );
};
