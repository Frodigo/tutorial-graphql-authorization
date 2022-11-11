import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            firstName: 'Marcin',
            lastName: 'Kwiatkowski',
            email: 'marcin@abc.xyz',
            password: 'admin123'
        },
    })


    const allUsers = await prisma.user.findMany();
    console.log('All users: ', allUsers);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect()
    });