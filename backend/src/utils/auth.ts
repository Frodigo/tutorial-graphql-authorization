import * as jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

require("dotenv").config();
const APP_SECRET = process.env.APP_SECRET;

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }
  try {
    return jwt.verify(
      token,
      APP_SECRET as Secret
    ) as unknown as AuthTokenPayload;
  } catch (e) {
    return {
      userId: 0,
    };
  }
}
