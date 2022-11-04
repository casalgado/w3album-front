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

const contractABI = require("../pages/contract-abi.json");
const contractAddress = "0x1Ee641636F495ec2b27fCEc42297081faaE8F82A";

const shapeContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);

export const getNFTs = async () => {
  let nfts = [];
  const m_provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = m_provider.getSigner();
  const address = await signer.getAddress();
  await alchemy.nft
    .getNftsForOwner(address)
    .then((res) => {
      nfts = res.ownedNfts.filter(
        (e) =>
          e.contract.address == "0x1ee641636f495ec2b27fcec42297081faae8f82a"
      );
      console.log(nfts);
    })
    .catch((e) => console.log(e.message));
  return nfts;
};

export const multiMint = async () => {
  const m_provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = m_provider.getSigner();
  console.log("Account:", await signer.getAddress());
  await shapeContract
    .connect(signer)
    .multiMint()
    .then((e) => console.log(e))
    .catch((e) => console.log(e.message));
};

export const connectWallet = async () => {
  console.log("i");
  if (window.ethereum) {
    console.log("b");
    try {
      console.log("c");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const obj = {
        status: "Connected",
        address: address,
        provider: provider,
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
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Connected",
          provider: provider,
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

export const submitAlbum = async (completion) => {
  const ids = Object.values(completion);
  console.log("submit", ids);

  const m_provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = m_provider.getSigner();
  console.log("Account:", await signer.getAddress());
  await shapeContract
    .connect(signer)
    .checkAlbumCompletion(ids)
    .then((e) => console.log(e))
    .catch((e) => console.log(e.message));
};

// alchemy.core
//   .getTokenBalances("0x5E4a3dAfc837cFc4B0FeD7Bab4363B983CC3Cb8F")
//   .then(console.log);
