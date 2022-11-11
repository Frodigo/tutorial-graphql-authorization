import { extendType, objectType, nonNull, stringArg } from "nexus";
import { NexusGenObjects } from "../../../nexus-typegen";

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

let users: NexusGenObjects['User'][] = [
    {
        id: 1,
        firstName: 'Marcin',
        lastName: 'Kwiatkowski',
        email: 'marcin@abc.xyz',
        password: 'admin123'
    },
    {
        id: 1,
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan@abc.xyz',
        password: 'admin1234'
    }
]

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("users", {   // 3
            type: "User",
            resolve(parent, args, context, info) {    // 4
                return users;
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

                let idCount = users.length + 1;
                const user = {
                    id: idCount,
                    firstName,
                    lastName,
                    email,
                    password
                };

                users.push(user);

                return user;
            },
        });
    },
});