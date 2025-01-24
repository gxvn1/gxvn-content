import { Server } from 'socket.io'
import { NextApiRequest, NextApiResponse } from 'next'

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('send-message', msg => {
        io.emit('receive-message', msg)
      })
    })
  }
  res.end()
}

export const GET = ioHandler
