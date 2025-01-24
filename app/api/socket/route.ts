import { Server } from 'socket.io'

const ioHandler = (req: any, res: any) => {
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
