import express, { Router, type Request, type Response} from 'express'
import { initializeAPI } from './api'
import { rootRedirect } from './rootRedirect'

const app = express()
const port = 3000

app.use(express.json())

initializeAPI(app)
rootRedirect(app)

// Server starten
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

