import express, { Router, type Request, type Response} from 'express'

const app = express()
app.use(express.json())

const port = 3000
const apiRouter = Router()



// Server starten
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Root-Route: Umleitung zu /api
app.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

app.use('/api', apiRouter) //Router an /api anbinden

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API!');
});

let posts = [
    {id: 1, content: 'first post'},
    {id: 2, content: 'second post'},
    {id: 3, content: 'thirdt post'},
];

apiRouter.get('/posts', (req: Request, res: Response) =>{
    res.send(posts)
})


apiRouter.post('/posts', (req: Request, res: Response) => {
    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        ...req.body, // Der Rest kommt aus dem Request-Body, bleibt aber hinter `id`.
    };
    posts.push(newPost);
    res.send(newPost);
});

apiRouter.put('/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // ID aus den Parametern extrahieren
    const { content } = req.body; // Nur den Content aus dem Body extrahieren
    const existingPost = posts.find((post) => post.id === id);

    if (!existingPost) {
        res.status(404).send('Post not found'); // Fehler: Post nicht gefunden
        return;
    }

    const updatedPost = { id, content }; // Reihenfolge explizit festlegen
    posts = posts.map((post) => (post.id === id ? updatedPost : post)); // Post aktualisieren
    res.send(updatedPost); // Aktualisierten Post zurückgeben
});


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