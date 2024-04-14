
import express from 'express';
import { compare } from 'bcrypt'
import z from 'zod';
import jwt from 'jsonwebtoken';

import { prisma } from '../../services/prisma';

const router = express.Router();

router.post("/", async (req, res) => {
    const schemaAuth = z.object({
        email: z.string().email(),
        password: z.string()
    })
    const { email, password } = schemaAuth.parse(req.body);

    const verifyUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!verifyUserExists) {
        return res.status(404).send('User not found!')
    }

    const isPasswordValid = await compare(password, verifyUserExists.password)

    if (!isPasswordValid) {
        return res.status(404).send('User not found!')
    }

    const token = jwt.sign({ id: verifyUserExists.id, email: verifyUserExists.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' })

    return res.status(200).send({ token, id: verifyUserExists.id, email: verifyUserExists.email })
})

export default router