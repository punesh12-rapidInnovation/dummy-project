
import './App.css';
import styled from 'styled-components'
import { PopupModal } from './PopupModal';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { relative } from 'path';

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

  const [walletConnected, setWalletConnected] = useState('')
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
      console.log('baalnce', web3.utils.fromWei(balance, 'ether'));

      setWalletBalance(web3.utils.fromWei(balance, 'ether'))
      setwalletAddress(accounts[0])
      setWalletConnected("true")

      localStorage.setItem('chainId', chainId.toString());
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', accounts[0]);
      localStorage.setItem('walletBalance', balance);
    } catch (error) {
      console.log('plase connect to metamask');
    }
  };

  useEffect(() => {
    const connected = localStorage.getItem('walletConnected')
    {
      const address = localStorage.getItem('walletAddress')
      //@ts-ignore
      setwalletAddress(address)

      const balance = localStorage.getItem('walletBalance')
      //@ts-ignore
      setwalletAddress(balance)

      setWalletConnected("true")

    }
  }, [localStorage.getItem('walletConnected')])

  const disonnectWallet = () => {

    localStorage.clear()
    localStorage.setItem('walletConnected', 'false');
    setWalletConnected("false")
  }

  return (
    <div className="App">

      <header className="App-header">
        {
          walletConnected == "true" ?
            <>

              <h6>Wallet address: {walletAddress}</h6>
              <h6>Wallet Balance: {walletBalance}</h6>
            </>
            :
            <h1>Connect wallet</h1>
        }
        <br />

        {
          walletConnected == "true" ?

            <Button
              onClick={() =>
                disonnectWallet()}
            >Disconnect</Button>
            :
            <Button
              onClick={() => setToggleModal(true)}
            >Connect</Button>

        }
        <PopupModal
          style={{
            display: toggleModal ? "block" : "none"
          }}
        >
          <div>
            <div>
              <Button
                onClick={() => { connectWallet(); setToggleModal(false) }}
              >Metamsk</Button>
            </div>
          </div>

          <input
            onClick={() => setToggleModal(false)}
            className="close"
            type="button" value="Close"
          />
        </PopupModal>
      </header>


      <div>
      </div>
    </div >
  );
}

export default App;
