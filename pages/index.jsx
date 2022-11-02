import React from "react";
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "./util/interact.js";

const Home = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  //called only once
  useEffect(() => {
    async function fetchWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      console.log("status:", status);
    }
    fetchWallet();
    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Connected");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top left button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
    setStatus(walletResponse.status);
  };

  return (
    <div id="container">
      <button className="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </div>
  );
};

export default Home;
