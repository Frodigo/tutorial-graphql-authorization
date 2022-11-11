import {extendType, nonNull, objectType, stringArg} from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {Secret} from "jsonwebtoken";
require('dotenv').config()
const APP_SECRET = process.env.APP_SECRET

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("users", {
            type: "User",
            resolve(parent, args, context, info) {
                const { userId } = context;

                if (!userId) {
                    throw new Error("Cannot view users without logging in.");
                }

                return context.prisma.user.findMany()
            },
        });
    },
});

export const UserMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("loginUser", {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const user = await context.prisma.user.findUnique({
                    where: { email: args.email },
                });

                if (!user) {
                    throw new Error("No such user found");
                }

                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                );
                if (!valid) {
                    throw new Error("Invalid password");
                }

                const token = jwt.sign({ userId: user.id }, APP_SECRET as Secret);

                return {
                    token,
                    user,
                };
            },
        });

        t.nonNull.field("registerUser", {
            type: "AuthPayload",
            args: {
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },

            async resolve(parent, args, context) {
                const { firstName, lastName, email, password } = args;

                const hashedPassword = await bcrypt.hash(password, 10)

                const user = await context.prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword
                    },
                });

                const token = jwt.sign({ userId: user.id }, APP_SECRET as Secret);

                return {
                    token,
                    user,
                };
            },
        });
    },
});