import React, { useState } from 'react'
import './Livechat.css'

import axios from "axios";

const LiveChat = () => {


    const [messages, setMessages] = useState<any>([
        {
            type: 'r',
            message: 'hello'
        },
        {
            type: 'r',
            message: 'hello'
        },
        {
            type: 's',
            message: 'hello'
        },
        {
            type: 'r',
            message: 'hello'
        },
    ])

    const [inputMessage, setinputMessage] = useState('')
    const divRef = React.useRef();

    const BASE_URL = 'http://diceroll.rapidinnovation.tech/api/v1/rooms/message'
    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },

    });


    const sendTOAPI = async () => {

        const data = {
            'username': 'punesh',
            'content': 'hello i am punesh'
        }
        api.post(BASE_URL, data)
            .then(res => console.log('res', res))
            .catch(err => console.log(err));
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // };
        // fetch(BASE_URL, requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log('data', data));


    }


    const handleInputMessage = (e: any) => {
        const { value } = e.target
        setinputMessage(value)
    }

    const handleSendMessage = () => {
        const newData = [{
            type: 's',
            message: inputMessage
        }]
        const updatedData = [...messages, ...newData]

        setMessages(updatedData)
        window.scroll({ top: 500, behavior: 'smooth' });

        console.log('updatedData', updatedData);


    }


    const renderchat = () => {
        return messages.map((m: any) => (
            <>
                {
                    m.type === 'r' ?
                        <div className="chat-receive">
                            {m.message}
                        </div >
                        :
                        <div className="chat-send">
                            {m.message}
                        </div>
                }
            </ >
        ))

    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                Live chat
            </div>

            <div className="chat-body">
                {renderchat()}
            </div>
            <div className='input-message'>
                <input
                    onChange={handleInputMessage}
                    type="text" name="" id="" />
                <button
                    // onClick={() => handleSendMessage()}
                    onClick={() => sendTOAPI()}
                >
                    <img src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/000000/external-send-social-media-prettycons-lineal-prettycons.png" />
                </button>
            </div>
        </div>


    )
}

export default LiveChat