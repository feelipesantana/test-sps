
import express from 'express';
import { authenticate } from '../authenticate';

const router = express.Router();

router.post("/", authenticate, (req, res) => {
    console.log("ola")
    // const authToken = req.headers.authorization
    // if(!authToken){
    //   res.send(users);

    // }
})

export default router