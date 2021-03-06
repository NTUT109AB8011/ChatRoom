import { CustomWebsocket } from "./utility"
import Message from './models/messages'

export let clients: CustomWebsocket[] = []
export function setClients(Newclients: CustomWebsocket[]) {
    clients = Newclients
}

export function broadCastMessage(message: any, ws: CustomWebsocket) {
    const NewMessage = new Message({
        email: ws.connectionID,
        subject: message.subject,
        message: message.message,
        date:Date.now()
    })
    NewMessage.save()
    for (let i = 0; i < clients.length; i++) {
        const client = clients[i]
        client.send(JSON.stringify({
            subject: message.subject,
            message: message.message,
            user: ws.connectionID,
            date:Date.now(),
            intent: 'chat'

        }))
    }
}
export async function retrieveAndSentMessage(ws: CustomWebsocket, count: number) {
    const messages = await Message.find({}, { email: 1, message: 1, subject: 1 }).sort({ date: -1 }).limit(count).lean()

    ws.send(JSON.stringify({
        intent: 'old-messages',
        data: messages,
    }))
}