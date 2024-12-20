import express, { type Express, type Request, type Response, Router } from 'express';
import { rootRedirect } from './rootRedirect'
import { initializePostsAPI } from './posts';
import { initializeAuthAPI } from './auth';

export const initializeAPI = (app: Express) => {
    rootRedirect(app)
    initializePostsAPI(app)
    initializeAuthAPI(app)
}