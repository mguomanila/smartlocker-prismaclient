import express from 'express'
import { router } from './router'

const server = express()
server.use(express.json())

server.use('/api', router)
const port = 3033
server.listen(process.env.PORT || port)
console.log(`listening on ${process.env.PORT || port}`)