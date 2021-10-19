
import './App.css';
import styled from 'styled-components'
import { PopupModal } from './PopupModal';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { relative } from 'path';
import LiveChat from './Chat';
import Chatui from './Chatui'

const Button = styled.button`
  background: black;
  color: white;
  border-radius: 7px;
  padding:10px 20px;
  margin: 10px;
  font-size: 16px;
  :disabled {
    opacity: 0.4;
  }
  :hover {
    box-shadow: 0 0 10px yellow;
  }
`;

function App() {

  const [walletConnected, setWalletConnected] = useState(false)
  const [toggleModal, setToggleModal] = useState(false)
  const [walletBalance, setWalletBalance] = useState("")
  const [walletAddress, setwalletAddress] = useState("")

  const connectWallet = async () => {
    try {
      let web3 = new Web3(Web3.givenProvider);

      const accounts = await web3.eth.requestAccounts();
      console.log(accounts[0]);

      const chainId = await web3.eth.getChainId();
      const balance = await web3.eth.getBalance(accounts[0]);
      const baanceInEther = web3.utils.fromWei(balance, 'ether')
      // console.log('baalnce', web3.utils.fromWei(balance, 'ether'));

      setWalletBalance(baanceInEther)
      setwalletAddress(accounts[0])
      setWalletConnected(true)

      localStorage.setItem('chainId', chainId.toString());
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', accounts[0]);
      localStorage.setItem('walletBalance', baanceInEther);
    } catch (error) {
      console.log('plase connect to metamask');
    }
  };



  useEffect(() => {
    const address = localStorage.getItem('walletAddress')
    const balance = localStorage.getItem('walletBalance')
    if (!!address) {
      //@ts-ignore
      setwalletAddress(address)
      //@ts-ignore
      setWalletBalance(balance)
      setWalletConnected(true)
    }
  }, [localStorage.getItem('walletConnected')])

  useEffect(() => {
    const getBalance = async () => {

      try {
        if (walletAddress) {
          let web3 = new Web3(Web3.givenProvider);
          const balance = await web3.eth.getBalance(walletAddress)
          const bal = web3.utils.fromWei(balance, "ether")
          setWalletBalance(bal.toString());
          console.log('bal', balance, walletAddress);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getBalance()
  }, [])

  const disonnectWallet = () => {
    setWalletConnected(false)
    // localStorage.setItem('walletConnected', 'false');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('chainId');

    setwalletAddress("")
    // setWalletBalance("")
  }

  return (
    <div className="App">

      <header className="App-header">
        {
          walletConnected ?
            <>
              <h6>Wallet address: {walletAddress}</h6>
              <h6>Wallet Balance: {walletBalance}</h6>
            </>
            :
            <h1>Connect wallet</h1>
        }
        <br />

        {
          walletConnected ?
            <Button
              onClick={() => disonnectWallet()}
            >Disconnect</Button>
            :
            <Button
              onClick={() => setToggleModal(true)}
            >Connect</Button>

        }

      </header>
      {/* <Chatui/> */}
      <Chatui
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        setToggleModal={setToggleModal}
        toggleModal={toggleModal}
      />
    </div >
  );
}

export default App;
