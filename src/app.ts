import express, { Router, type Request, type Response} from 'express'
import { initializeAPI } from './api'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

initializeAPI(app)


// Server starten
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

