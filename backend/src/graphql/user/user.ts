import {extendType, nonNull, objectType, stringArg} from "nexus";
import {NexusGenObjects} from "../../../nexus-typegen";

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
        t.nonNull.list.nonNull.field("users", {   // 3
            type: "User",
            resolve(parent, args, context, info) {    // 4
                return context.prisma.user.findMany()
            },
        });
    },
});

export const LinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("registerUser", {
            type: "User",
            args: {
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },

            resolve(parent, args, context) {
                const { firstName, lastName, email, password } = args;

                return context.prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        password
                    },
                });
            },
        });
    },
});