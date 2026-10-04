import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { access_token_secret, refresh_token_secret } from "../../config/env.config.js";
import { AppError } from "../errors/app.error.js";

export interface AppJwtPayload {
  id: string;
  role: string;
}

export class TokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor() {
    if (!access_token_secret) {
      throw new Error("ACCESS_TOKEN_SECRET is not configured in environment variables");
    }
    if (!refresh_token_secret) {
      throw new Error("REFRESH_TOKEN_SECRET is not configured in environment variables");
    }

    this.accessTokenSecret = access_token_secret;
    this.refreshTokenSecret = refresh_token_secret;
  }

  public generateAccessToken(payload: AppJwtPayload, expiresIn: SignOptions["expiresIn"] = "1h"): string {
    return jwt.sign(
      { id: payload.id, role: payload.role },
      this.accessTokenSecret,
      { expiresIn }
    );
  }

  public generateRefreshToken(payload: AppJwtPayload, expiresIn: SignOptions["expiresIn"] = "7d"): string {
    return jwt.sign(
      { id: payload.id },
      this.refreshTokenSecret,
      { expiresIn }
    );
  }

  public verifyAccessToken(token: string): AppJwtPayload {
    try {
      return jwt.verify(token, this.accessTokenSecret) as unknown as AppJwtPayload;
    } catch {
      throw AppError.unauthorized("Invalid or expired access token");
    }
  }

  public verifyRefreshToken(token: string): AppJwtPayload {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as unknown as AppJwtPayload;
    } catch {
      throw AppError.unauthorized("Invalid or expired refresh token");
    }
  }
}

export const tokenService = new TokenService();