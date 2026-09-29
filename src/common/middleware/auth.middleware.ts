import type { Request, Response, NextFunction } from "express";
import { TokenService, tokenService } from "../utils/token.utils.js";
import { AppError } from "../errors/app.error.js";

export class AuthMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  public authenticate = (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw AppError.unauthorized("Authorization header missing or improperly formatted");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw AppError.unauthorized("Access token missing");
      }

      const decoded = this.tokenService.verifyAccessToken(token);
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

  public authorize = (...roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
      try {
        if (!req.user) {
          throw AppError.unauthorized("User is not authenticated");
        }

        if (!roles.includes(req.user.role)) {
          throw AppError.forbidden("Access denied: Insufficient permissions");
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}

export const authMiddleware = new AuthMiddleware(tokenService);
export const authenticate = authMiddleware.authenticate;