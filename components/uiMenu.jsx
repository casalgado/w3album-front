import { NFTCard } from "../components/nftCard";
import { useState } from "react";

export const UiMenu = ({
  onMint,
  onSumbitAlbum,
  onGetNFTs,
  selectedToken,
  onTokenTransfer,
}) => {
  const [destinationAdress, setDestinationAddress] = useState("");

  const handleAddressChange = (event) => {
    setDestinationAddress(event.target.value);
  };

  return (
    <div className="bg-slate-300 w-72 h-screen flex flex-col justify-center p-10 gap-4">
      <button className="walletButton" onClick={onGetNFTs}>
        <span>Show Stickers</span>
      </button>
      <button className="walletButton" onClick={onMint}>
        <span>Mint 3</span>
      </button>
      <button className="walletButton" onClick={onSumbitAlbum}>
        <span>Submit Album</span>
      </button>
      <div>
        <NFTCard nft={selectedToken}></NFTCard>
        <input
          type="text"
          id="destinationAdress"
          name="destinationAdress"
          placeholder="destination address"
          className="w-full text-center mt-3"
          onChange={handleAddressChange}
          value={destinationAdress}
        />
      </div>
      <button
        className="walletButton"
        onClick={() =>
          onTokenTransfer(destinationAdress, selectedToken.tokenId)
        }
      >
        <span>Transfer Token</span>
      </button>
    </div>
  );
};

/* 
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
      */
