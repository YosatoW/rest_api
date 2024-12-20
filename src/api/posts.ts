import { type Express, type Request, type Response, Router } from 'express'
import ollama from 'ollama'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

import { db } from '../database'
import { postsTable } from '../db/schema'
import { apiRouter } from './rootRedirect'

// Exportiert der Funktion initializePostsAPI
export const initializePostsAPI = (app: Express) => {
 
    apiRouter.get('/posts', async (req: Request, res: Response) => {
        const posts = await db.select().from(postsTable)
        res.send(posts)
    })
    
    apiRouter.post('/posts', async (req: Request, res: Response) => {
        const userId = req.user?.id // Versucht die ID des auth-User aus dem "req.user" zu extrahieren.
        if (!userId) {
            res.status(401).send({ error: 'Unautohorized' })
            return
        }
        // der content aus dem req.body extrahiert. Dies ist der Inhalt des neuen Beitrags in der Datenbank.
        const { content } = req.body 
        const newPost = await db.insert(postsTable).values({ content, userId }).returning()
        res.send(newPost[0])
    })
        
    apiRouter.put('/posts/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const updatedPost = await
        db.update(postsTable).set(req.body).where(eq(postsTable.id,
        id)).returning()
        res.send(updatedPost[0])
    })
       
    app.delete('/api/posts/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        db.delete(postsTable).where(eq(postsTable.id, id)).execute()
        res.send({ id })
    })
    
    /*
    apiRouter.get('/posts/generate', async function (req: Request, res: Request) {
    const response = await ollama.chat({
        model: 'llama3.2:1b',
        messages: [{ role: 'user', content: '`Netzwerk10.10.0.0 /32 aufteilen in gleichgross zeigt die letzte netzwerkrange `' }],
        })
        posts.push({
        id: posts.length +1,
        content: response.message.content,
        })
        res.send(posts) 
    })
        */
}