import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setError('Wallet disconnected');
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } else {
      setError('MetaMask is not installed. Please install MetaMask.');
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setError('');
      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
        setError('Failed to connect wallet.');
      }
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConnectWallet;
