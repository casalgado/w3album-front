require("dotenv").config();
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_KEY;
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

const settings = {
  apiKey: alchemyApiKey,
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);
const provider = await alchemy.config.getProvider();

const contractABI = require("../contract-abi.json");
const contractAddress = "0x3f93a1D4F5db10E954866107dAFF376442b5C4Dc";

const shapeContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);

export const getBalance = async () => {
  const providerMetamask = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
  // Prompt user for account connections
  await providerMetamask.send("eth_requestAccounts", []);
  const signer = providerMetamask.getSigner();
  console.log("Account:", await signer.getAddress());
  shapeContract.connect(signer).multiMint();
  return shapeContract.generateImage("2");
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Connected",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status:
        " You must install Metamask, a virtual Ethereum wallet, in your browser.",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Connected",
        };
      } else {
        return {
          address: "",
          status: "Connect to Metamask using the top left button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getShapesByOwenr = async () => {
  alchemy.nft
    .getNftsForOwner("0x5E4a3dAfc837cFc4B0FeD7Bab4363B983CC3Cb8F")
    .then(console.log);
};

// alchemy.core
//   .getTokenBalances("0x5E4a3dAfc837cFc4B0FeD7Bab4363B983CC3Cb8F")
//   .then(console.log);
