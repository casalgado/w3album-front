import React from "react";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  getNFTs,
  multiMint,
  submitAlbum,
} from "../util/interact.js";
import { NFTCard } from "../components/nftCard";

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
    const mint = await multiMint();
    console.log(mint);
  };

  const handleCompleteAlbum = async () => {
    const nfts = await getNFTs();
    const completion = {};
    const attrs = nfts
      .filter((e) => e.rawMetadata.attributes[1].value == "No")
      .map((e) => {
        return { id: e.tokenId, shape: e.rawMetadata.attributes[0].value };
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
    <div id="container">
      <button className="walletButton" onClick={handleConnectWallet}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <button className="walletButton" onClick={handleGetNFTs}>
        <span>Get NFTs</span>
      </button>
      <button className="walletButton" onClick={handleMint}>
        <span>Mint 3</span>
      </button>
      <button className="walletButton" onClick={handleCompleteAlbum}>
        <span>Complete Album</span>
      </button>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft, i) => {
            return <NFTCard nft={nft} key={i}></NFTCard>;
          })}
      </div>
    </div>
  );
};

export default Home;
