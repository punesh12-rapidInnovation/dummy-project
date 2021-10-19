import React from 'react'
import styled from 'styled-components'
import Chatsection from './Chatsection.png';
import threedot from './threedot.svg';



const Box = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
`
const ChatBox = styled.div`
background: linear-gradient(90deg, rgba(239, 8, 150, 0.1) -6.9%, rgba(112, 7, 255, 0.1) 55.31%, rgba(0, 200, 255, 0.1) 107.28%);
box-shadow: 0px 3px 5px rgba(66, 20, 74, 0.6), inset 0px 0px 20px rgba(202, 26, 231, 0.9);
border-radius: 20px;
display: flex;
flex-direction:column;
justify-content:space-between;
align-items: flex-start;

>*{
    color: white;
}



`

const GlobalChatSection = styled.div`
background: rgba(0,0,0,1);
background-image: url(${Chatsection});
background-position: center;
background-size: cover;
height: 70vh;
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
padding: 10px;
display: flex;
width: 73%;
margin: 10px 0;
align-self: flex-start;
text-align: left;
`
const Ownmsg = styled.div`
background: linear-gradient(92.8deg, rgba(30, 232, 183, 0.8) 2.13%, rgba(172, 51, 191, 0.4) 102.29%);

border-radius: 10px;
padding: 10px;
display: flex;
width: 73%;
margin: 10px 0;
align-self: flex-end;
text-align: left;
`






function Chatui() {
    const messages = ['Phantompain and is about bitcoin ,bitcoin cash,blackchain,blockchaininfo,blue','essentially a digital letter of transactions that is duplicated and distributed across the ocean', 'how abou this ','phantom pain and is aboyt bitcoin bitcoin cash bloack and blockchain info ,blue']
    return (
        <GlobalChatSection>
            <Box style={{height:'75%',width:'90%',maxWidth:'1100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box style={{height:'75%',width:'45%',marginRight:'20px'}}></Box>
            <ChatBox style={{ height: '75%', width: '45%' }}>
                    <ChatTopdiv><div style={{textAlign:'left'}}> <h3 style={{fontSize:'14px'}}>GLOBAL CHAT</h3>
                        <h5 style={{ fontSize: '11px', color: '#18DEAE' }}>28 playing</h5></div> <img src={threedot} alt="" /></ChatTopdiv>
                    <ChatMiddlediv>
                        <Messagediv><h1 style={{fontSize:'11px'}}>essentially a digital letter of transactions that is duplicated and distributed across the ocean</h1></Messagediv>
                        <Messagediv><h1 style={{fontSize:'11px'}}>essentially a digital letter of transactions that is duplicated and distributed across the ocean</h1></Messagediv>
                        <Ownmsg><h1 style={{fontSize:'11px'}}>essentially a digital letter of transactions that is duplicated and distributed across the ocean</h1></Ownmsg>
                        <Ownmsg><h1 style={{ fontSize: '11px' }}>essentially a digital letter of transactions that is duplicated and distributed across the ocean</h1></Ownmsg>
                        <Messagediv><h1 style={{ fontSize: '11px' }}>essentially a digital letter of transactions that is duplicated and distributed across the ocean</h1></Messagediv>


                        
                    </ChatMiddlediv>
                    <Input style={{ width: '100%',height:'15%' }} type="text" placeholder="Type message..." />
            </ChatBox>
            </Box>
        
            
            
        </GlobalChatSection>
    )
}

export default Chatui
