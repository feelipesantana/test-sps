
import express from 'express';
import { authenticate } from '../authenticate';
import z from 'zod';
import { prisma } from '../../services/prisma';

const router = express.Router();

router.patch("/:id", authenticate, async (req, res) => {

    const schemaUpdateUser = z.object({
        id: z.string(),
    })
    const { id } = schemaUpdateUser.parse(req.params);
    const updatedFields = req.body;


    const verifyUserExists = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if (!verifyUserExists) {
        return res.status(400).send('User does not exist!')
    }

    const updateUser = await prisma.user.update({
        where: {
            id
        },
        data: updatedFields
    })

    if (!updateUser) {
        return res.status(400).send('Error to update user!')
    }

    return res.status(200).send(updateUser)

})

export default router