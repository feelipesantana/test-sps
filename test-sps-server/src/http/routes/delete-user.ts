
import express from 'express';
import { authenticate } from '../authenticate';
import z from 'zod';
import { prisma } from '../../services/prisma';

const router = express.Router();

router.delete("/:id", authenticate, async (req, res) => {
    const schemaDeleteUser = z.object({
        id: z.string(),
    })
    const {
        id,
    } = schemaDeleteUser.parse(req.params)

    const verifyUserExists = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if (!verifyUserExists) {
        return res.status(404).send('User does not exist!')
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id
        }
    })

    if (!deleteUser) {
        return res.status(400).send('Error to delete user!')
    }

    return res.status(200).send('User deleted successfully')

})

export default router