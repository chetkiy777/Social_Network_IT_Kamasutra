import React, {useEffect, useState} from 'react';


const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage = () => {

    return <div>
        <Chat/>
    </div>
}


const Chat = () => {

    return <div>
        <Messages/>
        <AddMessage/>
    </div>
}

const Messages = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return <div style={{height:'500px', overflowY:'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m} />)}

    </div>
}

const Message = ({message}) => {


    return <div style={{padding:"10px"}} key={message.userId}>
        <img style={{height: "50px", width: "50px"}} src={message.photo}/>
        <div>
            <b>
             {message.userName}
            </b>
        </div>
        <div>
            {message.message}
        </div>
        <hr/>
    </div>
}

const AddMessage = () => {

    let [textBody, setTextBody] = useState('')

    const sendMessage = () => {
        if (!textBody) {
            return;
        }
        ws.send(textBody)
        setTextBody('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setTextBody(e.currentTarget.value)} value={textBody}/>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage


