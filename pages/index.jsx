import React from "react";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  getNFTs,
  mintPack,
  submitAlbum,
} from "../util/interact.js";
import { NFTAlbum } from "../components/nftAlbum";
import { UiMenu } from "../components/uiMenu";

const Home = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [NFTs, setNFTs] = useState([]);

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

  const handleConnectWallet = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
    setStatus(walletResponse.status);
  };

  const handleGetNFTs = async () => {
    const nfts = await getNFTs();
    console.log("nfts", nfts);
    setNFTs(nfts);
  };

  const handleMint = async () => {
    const mint = await mintPack();
    console.log(mint);
  };

  const handleCompleteAlbum = async () => {
    const nfts = await getNFTs();
    const completion = {};
    const attrs = nfts
      .filter((e) => e.inAlbum == "0")
      .map((e) => {
        return { id: e.tokenId, shape: e.shape };
      })
      .sort(inverseById);

    attrs.forEach((e) => {
      completion[e.shape] = e.id;
    });

    console.log("attrs", attrs);
    console.log("completion", completion);
    if (completeAlbum(completion)) {
      console.log("album completed");
      submitAlbum(completion);
    } else {
      console.log("album not complete");
    }
  };

  function completeAlbum(completion) {
    return Object.keys(completion).length == 9;
  }

  function inverseById(first, second) {
    let a = parseInt(first.id);
    let b = parseInt(second.id);
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  }

  return (
    <div id="container" className="bg-white">
      {/* <UiMenu></UiMenu> */}
      <button
        className="walletButton float-right"
        onClick={handleConnectWallet}
      >
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <button className="walletButton mr-2" onClick={handleGetNFTs}>
        <span>Get Stickers</span>
      </button>
      <button className="walletButton mr-2" onClick={handleMint}>
        <span>Mint 3</span>
      </button>
      <button className="walletButton mr-2" onClick={handleCompleteAlbum}>
        <span>Submit Album</span>
      </button>
      <div>
        <NFTAlbum nfts={NFTs}></NFTAlbum>
      </div>
    </div>
  );
};

export default Home;
