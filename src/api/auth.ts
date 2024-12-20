import { type Express, type Request, type Response, Router } from 'express'
import ollama from 'ollama'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'

import { db } from '../database'
import { usersTable } from '../db/schema'
import { apiRouter } from './rootRedirect'

const jwtSecret = process.env.JWT_SECRET || "supersecret123"


export const initializeAuthAPI = (app: Express) => {
    apiRouter.post('/auth/register', async (req: Request, res: Response) => {
        const { username, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await db.insert(usersTable).values({ username, password: passwordHash}).returning()
        res.send({ id: newUser[0].id, username: newUser[0].username })
    })

    apiRouter.post('/auth/login', async (req: Request, res: Response) => {
        const { username, password } = req.body
        //Benutzer aus der Datenbank abrufen
        const existingUsers = await db.select().from(usersTable).where(eq(usersTable.username, username))
        if (!existingUsers.length) {
            res.status(401).send({error: 'Username does not exist.'})
            return
        }
        const existingUser = existingUsers[0]
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if (passwordMatch) {
            const token = jwt.sign({ id: existingUser.id, username: existingUser.username }, jwtSecret, { expiresIn: '1h' })
            res.send(token)
            return
        } else {
            res.status(401).send({error: 'Incorrect password'})
            return
        }
        
    })    
}   