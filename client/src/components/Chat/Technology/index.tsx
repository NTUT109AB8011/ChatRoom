import { TextField, Button, ListItemAvatar, Avatar, ListItemText, ListItem, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


export type Message = {
    user: string
    message: string
    intent: string
    subject: string
    date: string
}
function processMessage(payload: string) {
    try {
        return JSON.parse(payload)
    } catch (error) {
        return null
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,

    },
    inline: {
        display: 'inline',
    },
}));

export default function Chat() {
    const classes = useStyles();
    const [chatMessage, setChatMessage] = useState("")
    const [Subject, setSubject] = useState("")
    const [wsRef, setWsRef] = useState<null | WebSocket>(null)
    const [chatMessages, setChatMessages] = useState<Message[]>([])
    const history = useHistory();
    const [dateMessage, setdatEMessage] = useState("")



    function sendMessage() {
        if (wsRef?.readyState !== WebSocket.OPEN) {
            // websoket not connected
            return
        }
        wsRef.send(JSON.stringify({ subject: Subject, message: chatMessage, date:dateMessage,intent: 'chat' }))
        setChatMessage("")
        setSubject("")
        setdatEMessage("")
    }

    async function loginUser() {

        history.push('././')
    }

    useEffect(() => {

        const ws = new WebSocket('ws://140.124.93.194:1338/' + localStorage.getItem('token'))

        ws.addEventListener('open', () => {
                console.log('連線開啟')
                ws.send(JSON.stringify({
                    intent: 'old-messages',
                    count: 10
                }))
            }, { once: true }
        )



        ws.addEventListener('error', () => {
            history.replace('/login?authError')
        })

        ws.addEventListener('message', (event) => {


            const data = event.data
            const message: any = processMessage(data)

            //message.message += (message.user + "join!")
            if (!message) return
            if (message.intent === "chat") {
                setChatMessages(oldMessages => {
                    return [...oldMessages, message as Message]
                })
                const a=document.getElementById('a')
                // @ts-ignore
                a.textContent=message.user+'傳送新訊息'}

            // else if (message.intent === 'old-messages') {
            //         setChatMessages(
            //             message.data.map((item: any) => {
            //                 return {
            //                     user: item.email,
            //                     subject: item.subject,
            //                     message: item.message,
            //                 }
            //             }).reverse()
            //         )
            // }
        })
        ws.addEventListener('close', () => {
            console.log('連結關閉')
        })

        setWsRef(ws)
        return () => {
            ws.close()
        }

    }, [])

    return (
        <div className="col-centered">
            <h1 className ="col" >Technology Chat</h1>
            <div>
                <button onClick={()=>history.push('./'+'Math')} className={'button'}>Math</button>
                <button onClick={()=>history.push('./'+'Lounge')} className={'button'}>Lounge</button>
                <button onClick={()=>history.push('./'+'Programming')} className={'button'}>Programming</button>
                <button onClick={()=>history.push('./'+'Physics')} className={'button'}>Physics</button>
            </div>
            <h2 id={'a'}></h2>
            <div className='ChattingRoom'>
                {chatMessages.map((message, index) => {
                    return (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={message.subject}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {message.message}
                                        </Typography>
                                        {" - " + message.user}
                                        {" - " + message.date}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )
                })}</div>


            <TextField
                onChange={e => setSubject(e.target.value)}
                multiline
                value={Subject}
                label="Subject"
                variant="outlined"
                color="primary">
            </TextField>
            <TextField
                onChange={e => setChatMessage(e.target.value)}
                multiline
                value={chatMessage}
                label="Message"
                variant="outlined"
                color="primary">
            </TextField>
            {/*<TextField*/}
            {/*    onChange={e => setdatMessage(e.target.value)}*/}
            {/*    multiline*/}
            {/*    value={new Date().toLocaleString()}*/}
            {/*    label="Message"*/}
            {/*    variant="outlined"*/}
            {/*    color="primary">*/}
            {/*</TextField>*/}

            <Button variant="outlined" color="primary" onClick={sendMessage}>Send Message</Button>
        </div>

    )
}