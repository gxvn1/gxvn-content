'use client'

import { useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

let socket: Socket | null = null

export default function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Prompt for username before connecting
    const userInput = prompt('Enter your username for chat:')
    if (userInput) {
      setUsername(userInput)
      socketInitializer()
    }
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('receive-message', (message: string) => {
      setMessages(prev => [...prev, message])
    })
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && username) {
      const messageToSend = `${username}: ${message}`
      socket.emit('send-message', messageToSend)
      setMessage('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Live Chat</h2>
        
        <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg}
            </div>
          ))}
        </div>
        
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700"
            placeholder="Type your message..."
            disabled={!isConnected}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!isConnected}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
