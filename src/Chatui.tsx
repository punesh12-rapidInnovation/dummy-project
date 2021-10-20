import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Chatsection from './Chatsection.png';
import threedot from './threedot.svg';
import sendIcon from './send-icon.svg';

import { io } from "socket.io-client";
import axios from 'axios';
import './Livechat.css'


 const Box = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
`

const PopupModal = styled.button`
height:50vh;
width:50vh;
background: lightgray;
position:absolute;
top:20;
left:50;
border-radius:20px;
`;



const ChatBox = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
display: flex;
flex-direction:column;
justify-content:space-between;
align-items: flex-start;
display: relative;

>*{
    color: white;
}
`

const GlobalChatSection = styled.div`
background: rgba(0,0,0,1);
background-image: url(${Chatsection});
background-position: center;
background-size: cover;
height: 90vh;
width: 100%;
display: flex;
justify-content:center;
align-items: center;
`

const Input = styled.input`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.2) -6.9%, rgba(112, 7, 255, 0.2) 55.31%, rgba(0, 200, 255, 0.2) 107.28%);
border-radius: 0px 0px 20px 20px;
box-shadow: 0px 3px 5px rgba(23, 15, 24, 0.5), inset 0px 0px 14px rgba(202, 26, 231, 0.6);
border: none;
padding-left: 20px;
display: flex;
justify-content: space-between;
align-items: center;
color: white;

::placeholder{
    color:white;
}
:focus{
    outline: none;
}
 
`
const ChatTopdiv = styled.div`
display: flex;
width: 100%;
height: 16%;
justify-content: space-between;
align-items: center;
padding-left: 8% ;
padding-right: 8% ;
padding-top: 16px;

`
const ChatMiddlediv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 63%;
justify-content: center;
padding: 10px 20px;
overflow:scroll;

::-webkit-scrollbar {
                display: none;
            }

`

const Messagediv = styled.div`
background: rgba(255, 255, 255, 0.23);
border-radius: 10px;
padding: 15px;
display: flex;
max-width: 73%;
border-top-left-radius:0;
margin: 10px 0;
align-self: flex-start;
text-align: left;
word-break: break-all;


`
const Ownmsg = styled.div`
background: linear-gradient(92.8deg, rgba(30, 232, 183, 0.8) 2.13%, rgba(172, 51, 191, 0.4) 102.29%);
border-radius: 10px;
border-bottom-right-radius:0;
padding: 15px;
display: flex;
max-width: 73%;
margin: 10px 0;
align-self: flex-end;
text-align: left;
word-break: break-all;
`
const InputParent = styled.div`
width: 100%;
height: 14%;
position: relative;
`
const Button = styled.button`
background-image: url(${sendIcon});
background-position: center;
background-size: contain;
cursor: pointer;
border-radius: 12px;
width: 40px;
height: 40px;
border: none;
position: absolute;
bottom: 14px;
right: 12px;
`



const Chatui = (props: any) => {


    const { walletAddress, connectWallet, setToggleModal, toggleModal } = props

    const [messages, setMessages] = useState<any>([])
    const [inputMessage, setinputMessage] = useState('')




    const BASE_URL = 'https://diceroll.rapidinnovation.tech/api/message'

    useEffect(() => {
        const socket = io('wss://diceroll.rapidinnovation.tech',
            // {
            //     extraHeaders: {
            //         'Access-Control-Allow-Origin': 'true',
            //         "Access-Control-Allow-Headers": 'true'
            //     }
            // }
        );
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


    // useEffect(() => {
    //     window.addEventListener('keyup', (event) => {
    //         if (event.code === '13') {
    //             if (walletAddress !== '' && inputMessage !== '') {
    //                 sendTOAPI()
    //                 console.log('runnig');

    //             }
    //         }
    //     });
    // })

    const sendTOAPI = async () => {

        const data =
        {
            'username': walletAddress,
            'content': inputMessage
        };

        try {

            const config: any = {
                method: 'post',
                url: BASE_URL,
                // headers: {
                //     'content-Type': 'application/json',
                //     'Access-Control-Allow-Origin': '*',
                //     "Access-Control-Allow-Headers": 'true'
                //     //  "Origin, X-Requested-With, Content-Type, Accept"
                // },
                data: data
            }

            axios(config)
                .then(function (res) {
                    console.log('response', res);
                })
                .catch(function (err) {
                    console.log(err);
                })


        } catch (error) {
            console.log(error);
        }
        finally {
            setinputMessage('')
        }



    }

    const handleInputMessage = (e: any) => {
        const { value } = e.target
        setinputMessage(value)
    }

    const renderchat = () => {
        return messages.map((m: any, index: any) => (
            m.username === walletAddress ?
                <Ownmsg key={index}
                >
                    <h1 style={{ fontSize: '11px' }}>
                        {m.content}
                    </h1>
                </Ownmsg>

                :
                <Messagediv key={index}>
                    <h1 style={{ fontSize: '11px' }}>
                        {m.content}
                    </h1>
                </Messagediv>


        ))
    }

    return (
        <GlobalChatSection>
            <Box style={{ height: '75%', width: '90%', maxWidth: '1100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box style={{ height: '75%', width: '45%', marginRight: '20px' }}></Box>
                <ChatBox style={{ height: '75%', width: '45%', position: 'relative' }}>


                    <ChatTopdiv><div style={{ textAlign: 'left' }}> <h3 style={{ fontSize: '14px' }}>GLOBAL CHAT</h3>
                        <h5 style={{ fontSize: '11px', color: '#18DEAE' }}>28 playing</h5></div> <img src={threedot} alt="" /></ChatTopdiv>
                    <ChatMiddlediv>
                        {renderchat()}
                    </ChatMiddlediv>
                    <InputParent>
                    <Input
                        onChange={handleInputMessage}
                        value={inputMessage}
                        style={{ width: '100%', height: '100%' }} type="text" placeholder="Type message..." />
                    
                    <Button
                        onClick={() => { sendTOAPI() }}
                        disabled={walletAddress === '' || inputMessage === ''}

                    >
                    </Button>
                    </InputParent>


                </ChatBox>
            </Box>

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
        </GlobalChatSection >
    )
}

export default Chatui
