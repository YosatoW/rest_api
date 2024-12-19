import express, { type Express, type Request, type Response, Router } from 'express';
import ollama from 'ollama';

import { apiRouter } from './rootRedirect'; // Importiere den existierenden Weiterleitung
import {db} from './database';
import {postsTable} from './db/schema';
import {eq} from 'drizzle-orm';


const app = express();

app.use(express.json());


export const initializeAPI = (app: Express) => {


    let posts = [{ id: 1, content: 'I feel like' }]


    apiRouter.get('/posts', async (req: Request, res: Response) => {
        const posts = await db.select().from(postsTable)
        res.send(posts)
    })
        
    apiRouter.post('/posts', async (req: Request, res: Response) => {
        const newPost = await
        db.insert(postsTable).values(req.body).returning()
        res.send(newPost[0])
    })
        
    apiRouter.put('/posts/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const updatedPost = await
        db.update(postsTable).set(req.body).where(eq(postsTable.id,
        id)).returning()
        res.send(updatedPost[0])
    })
       
    apiRouter.delete('/posts/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const existingPost = posts.findIndex((post) => post.id === id);
    
        if (existingPost === -1) {
            res.status(404).send('Post not found');
            return;
        }
    
        posts.splice(existingPost, 1); // Entfernt den Post an der gefundenen Position
        res.status(200).send({ message: 'Post successfully deleted', posts }); // Erfolgreiche Rückmeldung
    });
    

    
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






}  