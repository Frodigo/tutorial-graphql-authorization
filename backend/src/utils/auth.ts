import * as jwt from "jsonwebtoken";
import {Secret} from "jsonwebtoken";
import {Context} from "../context";
require('dotenv').config()
const APP_SECRET = process.env.APP_SECRET

export interface AuthTokenPayload {
    userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
        throw new Error("No token found");
    }
    return jwt.verify(token, APP_SECRET as Secret) as unknown as AuthTokenPayload;
}

export function isUserLoggedIn(context: Context): void | never {
    const { userId } = context;

    if (!userId) {
        throw new Error("Cannot view users without logging in.");
    }
}
