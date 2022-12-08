import express from 'express'
import { Server } from './app'

const app = express()
const server = new Server(app)

server.init()
  .catch(err => console.log(err))
