import express, { type Express, type Request, type Response, Router } from 'express';
import ollama from 'ollama';

import {db} from '../database';
import {postsTable} from '../db/schema';
import {eq} from 'drizzle-orm';
import { apiRouter } from './rootRedirect'
import bcrypt from 'bcrypt'


export const initializeAuthAPI = (app: Express) => {
    apiRouter.post('/auth/register', async (req: Request, res: Response) => {
        const { password, username } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        // const newUser = await db.insert(usersTable).values({ username, password: passwordHash}).returning()
        res.send(passwordHash)
        // res.send({ id: newUser[0].id, username: newUser[0].username })
    });




    
}   