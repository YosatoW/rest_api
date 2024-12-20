import { type Express, type Request, type Response, Router } from 'express'
import { rootRedirect } from './rootRedirect'
import { authMiddleware } from './auth-middleware'
import { initializePostsAPI } from './posts'
import { initializeAuthAPI } from './auth'


export const initializeAPI = (app: Express) => {
    rootRedirect(app)
    authMiddleware(app)
    initializePostsAPI(app)
    initializeAuthAPI(app)
}