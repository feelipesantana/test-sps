
import express from 'express';
import { authenticate } from '../authenticate';
import z from 'zod';
import { prisma } from '../../services/prisma';

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    const schemaDeleteUser = z.object({
        email: z.string().email(),
    })
    const {
        email,
    } = schemaDeleteUser.parse(req.body)

    const verifyUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!verifyUserExists) {
        return res.status(400).send('User does not exist!')
    }

    const deleteUser = await prisma.user.delete({
        where: {
            email
        }
    })

    if (!deleteUser) {
        return res.status(400).send('Error to delete user!')
    }

    return res.status(200).send('User deleted successfully')

})

export default router