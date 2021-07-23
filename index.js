import bodyParser from 'body-parser'
import express from 'express'
import setRoutes from './routes'

const app = express()

app.use(bodyParser.json())

setRoutes(app)

app.listen(3000)

console.log('server running!')
