
import express from 'express';
import { authenticate } from '../authenticate';
import { prisma } from '../../services/prisma';

const router = express.Router();

router.get("/", authenticate, async (req, res) => {

    const getUsers = await prisma.user.findMany()

    return res.status(200).send(getUsers)
})

export default router