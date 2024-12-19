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
                    <head>
                        <style>
                            /* Flexbox Layout */
                            .links-container {
                                display: flex; /* Anordnung der Links in einer Reihe */
                                gap: 15px; /* Abstand zwischen den Links */
                                margin-top: 10px;
                            }
        
                            a {
                                text-decoration: none;
                                color: #007bff;
                                font-size: 18px;
                            }
        
                            a:hover {
                                text-decoration: underline;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Welcome to the Localhost!</h1>
                        <form id="navigation-API">
                            <label for="navigation">Choose where to go:</label>
                            <select id="navigation" name="navigation">
                                <option value="posts">Posts</option>
                                <option value="comments">Comments</option>
                                <option value="profile">Profile</option>
                                <option value="ki">KI</option>
                            </select>
                            <button type="submit">Go</button>
                        </form>
        
                        <br/>
        
                        <h2>Direkt zu den Endpunkten:</h2>
                        <div class="links-container" id="dynamic-links"></div>
        
                        <script>
                            document.getElementById('navigation-API').addEventListener('submit', (e) => {
                                e.preventDefault();
                                const selection = document.getElementById('navigation').value;
                                window.location.href = '/api/' + selection;
                            });
        
                            const basePath = '/api/';
                            const endpoints = ['posts', 'comments', 'profile', 'ki'];
        
                            const linksContainer = document.getElementById('dynamic-links');
                            
                            endpoints.forEach(endpoint => {
                                const linkElement = document.createElement('a');
                                linkElement.href = basePath + endpoint;
                                linkElement.textContent = \` \${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}\`;
                                linksContainer.appendChild(linkElement);
                            });
                        </script>
                    </body>
                </html>
        `);
    });
}