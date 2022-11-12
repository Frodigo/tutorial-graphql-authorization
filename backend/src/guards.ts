import {Context} from "./context";
import {ForbiddenError} from "apollo-server";

export function isUserLoggedIn(context: Context): void | never {
    const { userId } = context;

    if (!userId) {
        throw new ForbiddenError("Cannot view users without logging in.");
    }
}