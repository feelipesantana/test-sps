
import express from 'express';
import { z } from 'zod';
import { authenticate } from '../authenticate';
import { prisma } from '../../services/prisma';
import bcrypt from 'bcrypt'

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    const schemaCreateUser = z.object({
        name: z.string(),
        email: z.string().email(),
        type: z.string(),
        password: z.string()
    })

    const {
        name,
        email,
        type,
        password
    } = schemaCreateUser.parse(req.body)

    const verifyUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (verifyUserExists) {
        return res.status(400).send('User already exists!')
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash,
            type
        }
    })

    if (!createUser) {
        return res.status(400).send('error to create user!')
    }

    console.log(createUser)
    return res.status(201).send(createUser)

})

export default router