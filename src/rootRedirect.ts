import express, { type Express, type Request, type Response, Router } from 'express';

export const apiRouter = Router(); // Exportiere den apiRouter, damit api.ts ihn verwenden kann

export const rootRedirect = (app: Express) => {
    // Root-Route: Umleitung zu /api
    app.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
    });

    app.use('/api', apiRouter) // Verwende den apiRouter, der aus api.ts kommt


    apiRouter.get('/', (req: Request, res: Response) => {
        res.send(`
            <html>
                <body>
                    <h1>Welcome to the Localhost!</h1>
                    <form id="navigation-API">
                        <label for="navigation">Choose where to go:</label>
                        <select id="navigation" name="navigation">
                            <option value="posts">Posts</option>
                            <option value="auth/register">Register</option>
                            <option value="auth/login">Login</option>
                        </select>
                        <button type="submit">Go</button>
                    </form>

                    <script>
                        document.getElementById('navigation-API').addEventListener('submit', (e) => {
                            e.preventDefault();
                            const selection = document.getElementById('navigation').value;
                            window.location.href = '/api/' + selection;
                        });
                    </script>
                    <br/>
                    <a href="/api/posts">Posts</a>
                    <a href="/api/auth/register">Register</a>
                    <a href="/api/auth/login">Login</a>
                </body>
            </html>
        `);
    });
}