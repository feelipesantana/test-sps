import { prisma } from "../services/prisma";
import bcrypt from 'bcrypt'

export async function createUserPrisma(name: string, email: string, type: string, password: string) {
    try {
        const verifyUserExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!verifyUserExists) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    type,
                    password: passwordHash
                }
            });
            console.log('User created:', user);

        } else {
            await prisma.$disconnect();
        }

    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await prisma.$disconnect();
    }
}