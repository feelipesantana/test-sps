
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import getUsers from './http/routes/get-users';
import createUser from './http/routes/create-user';
import deleteUser from './http/routes/delete-user';
import updateUser from './http/routes/update-user';

import auth from './http/routes/auth';

import { createUserPrisma } from './utils/createUserPrisma';


const PORT = process.env.PORT || 3333

const app = express();
dotenv.config();


app.use(cors());
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
}));

app.use(express.json());
createUserPrisma("admin", 'admin@spsgroup.com.br', 'admin', '1234')
app.use('/users', createUser)
app.use('/users', getUsers)
app.use('/users', deleteUser)
app.use('/users', updateUser)
app.use('/auth', auth)



app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3333");
});
