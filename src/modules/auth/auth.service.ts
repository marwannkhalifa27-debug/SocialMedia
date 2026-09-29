import bcrypt from "bcrypt";
import { userModel } from "../../DB/models/user.model.js";
import { UserService } from "../user/user.service.js";
import { AppError } from "../../common/errors/app.error.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/token.utils.js";
import type { LoginDto, RegisterDto } from "./auth.validation.js";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async register(dto: RegisterDto) {
    const { fullName, username, email, password, sex, age, phone } = dto;

    const existingEmail = await this.userService.findUserByEmail(email);
    const existingUsername = await this.userService.findUserByUsername(username);

    if (existingEmail || existingUsername) {
      throw AppError.conflict("Email or username is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ 
        fullName,
        username,
        email,
        password: hashedPassword,
        sex,
        age,
        phone
    });

    const accessToken = generateAccessToken({
      _id: user._id.toString(),
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id.toString(),
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        sex: user.sex,
        age: user.age,
        phone: user.phone,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    };
  }

  public async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw AppError.unauthorized("Invalid email or password");
    }

    const accessToken = generateAccessToken({
      _id: user._id.toString(),
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id.toString(),
      role: user.role,
    });

    return {
      tokens: { accessToken, refreshToken },
    };
  }
}