import { Context } from "./context";
import { AuthenticationError, ForbiddenError } from "apollo-server";

export function isUserLoggedIn(context: Context): void | never {
  const { userId } = context;

  if (userId === 0) {
    throw new AuthenticationError(
      "Your session has been expired. Please login into your account."
    );
  }

  if (!userId) {
    throw new ForbiddenError(
      "Cannot view the secret content without logging in."
    );
  }
}
