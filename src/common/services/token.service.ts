import jwt, { sign } from "jsonwebtoken";
import moment, { Moment } from "moment";
import { envs } from "../../../config/env";

export class TokenService {
  private secretKey: string = envs.jwt.secret || "";
  private accessExpirationMinutes: number = envs.jwt.accessExpirationMinutes;
  private refreshExpirationDays: number = envs.jwt.refreshExpirationDays;

  /**
   *
   * @param email
   * @param expires
   */
  public generateToken(email: string, expires: Moment): string {
    const payload = {
      email,
      iat: moment()
        .toDate()
        .getTime(),
      exp: expires.toDate().getTime()
    };
    return sign(payload, this.secretKey);
  }

  /**
   *
   * @param token
   * @param email
   * @param expires
   * @param type
   * @param blacklisted
   */
  public static saveToken(
    token: string,
    email: string,
    expires: Moment,
    type: string,
    blacklisted: boolean = false
  ): object {
    // CREATE THE TOKEN WHEN THE MODEL IS CREATED
    const tokenDoc = {
      token,
      email,
      expires: expires.toDate(),
      type,
      blacklisted
    };
    return tokenDoc;
  }

  public verifyToken(token, type): object {
    const payload = jwt.verify(token, this.secretKey);

    // SHOULD FIND THE TOKEN DOC FROM THE DOC
    const tokenDoc = {
      token,
      type,
      email: payload,
      blacklisted: false
    };
    if (!tokenDoc) {
      const err = {
        code: 404,
        message: "Invalid token"
      };
      throw err;
    }
    return tokenDoc;
  }

  /**
   *
   * @param email
   */
  public generateAuthTokens(
    email: string
  ): {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  } {
    const accessTokenExpires: Moment = moment().add(
      this.accessExpirationMinutes,
      "minutes"
    );

    const refreshTokenExpires = moment().add(
      this.refreshExpirationDays,
      "days"
    );

    const accessToken = this.generateToken(email, accessTokenExpires);
    const refreshToken = this.generateToken(email, refreshTokenExpires);

    const returnTokens = {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate()
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate()
      }
    };

    return returnTokens;
  }
}

export default new TokenService();