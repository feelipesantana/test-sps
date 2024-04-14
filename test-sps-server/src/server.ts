
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import createUser from './http/routes/create-user';
import deleteUser from './http/routes/delete-user';
import auth from './http/routes/auth';

import { createUserPrisma } from './utils/createUserPrisma';


const PORT = process.env.PORT || 3000

const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
createUserPrisma("admin", 'admin@spsgroup.com.br', 'admin', '1234')

app.use('/users', createUser)
app.use('/auth', auth)
app.use('/delete-user', deleteUser)



app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
