import React, { useEffect, useState } from 'react'
import './Livechat.css'
import { io } from "socket.io-client";

import axios from "axios";
import { PopupModal } from './PopupModal';

const LiveChat = (props: any) => {

    const { walletAddress, connectWallet, setToggleModal, toggleModal } = props

    const [messages, setMessages] = useState<any>([])

    const [inputMessage, setinputMessage] = useState('')



    const BASE_URL = 'https://diceroll.rapidinnovation.tech/api/message'

    useEffect(() => {
        const socket = io('wss://diceroll.rapidinnovation.tech');
        try {
            socket.on('connection', () => {
                // Replace event name with connection event name
                console.log('websocket connected');
            });
            // socket.emit('message');
            socket.on('message', (data) => {
                console.log('data', data);
                const updatedData = [...messages, data]
                setMessages(updatedData)


            });
        } catch (err) {
            console.log('err', err);

        }
        return () => {
            socket.disconnect();
        };
    }, [messages]);

    const sendTOAPI = async () => {
        const data =
        {
            'username': walletAddress,
            'content': inputMessage
        };
        const config: any = {
            method: 'post',
            url: BASE_URL,
            headers: {
                'content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: data
        }

        axios(config)
            .then(function (res) {
                console.log('response', res);
            })
            .catch(function (err) {
                console.log(err);
            })

    }


    const handleInputMessage = (e: any) => {
        const { value } = e.target
        setinputMessage(value)
    }

    const renderchat = () => {
        return messages.map((m: any) => (
            m.username === walletAddress ?
                <div className="chat-send">
                    {m.content}</div>
                :
                <div className="chat-receive">
                    {m.content}
                </div >

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
                    type="text" name="" id="" value={inputMessage} />
                <button

                    disabled={walletAddress === '' || inputMessage === ''}
                    // onClick={() => handleSendMessage()}
                    onClick={() => { sendTOAPI(); setinputMessage('') }}
                >
                    <img src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/000000/external-send-social-media-prettycons-lineal-prettycons.png" />
                </button>
            </div>


            <PopupModal
                style={{
                    display: toggleModal ? "block" : "none"
                }}
            >
                <div>
                    <div>
                        <input type="submit"
                            value="Metamask"
                            className="popup-button"
                            onClick={() => { connectWallet(); setToggleModal(false) }}
                        />
                    </div>
                </div>

                <input
                    onClick={() => setToggleModal(false)}
                    className="close"
                    type="button" value="Close"
                />
            </PopupModal>
        </div>


    )
}

export default LiveChat