require("dotenv").config();
const alchemyApiKey = process.env.NEXT_PUBLIC_REACT_APP_ALCHEMY_KEY;
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

const settings = {
  apiKey: "MsdyXiw5A0rTUmlZN2EGtWF_4lBo6dYK",
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);
const provider = await alchemy.config.getProvider();

const contractABI = require("../pages/contract-abi.json");
const contractAddress = "0x4cd5c33e0c27409966403a05c8b1815a526ac174";

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
      //console.log(res.ownedNfts);
      nfts = res.ownedNfts
        .filter((e) => e.contract.address == contractAddress)
        .map((e) => {
          //console.log(e);
          return {
            tokenId: e.tokenId,
            title: e.title,
            image: e.media[0].gateway,
            shape: e.rawMetadata.attributes[0].value,
            slot: e.rawMetadata.attributes[1].value,
            inAlbum: e.rawMetadata.attributes[2].value,
          };
        });
      //console.log("map", nfts);
    })
    .catch((e) => console.log(e.message));
  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i];
    let image = await shapeContract
      .connect(provider)
      .generateImage(nft.tokenId);
    nft.image = image;
  }
  console.log("end", nfts);
  return nfts;
};

export const mintPack = async () => {
  const m_provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = m_provider.getSigner();
  console.log("Account:", await signer.getAddress());
  let mintTx;
  try {
    mintTx = await shapeContract.connect(signer).mintPack();
    mintTx.wait();
  } catch (error) {
    console.log(error);
  }
  return mintTx;
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
    .submitAlbum(ids)
    .then((e) => console.log(e))
    .catch((e) => console.log(e.message));
};

export const tokenTransfer = async (destinationAddress, id) => {
  const m_provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = m_provider.getSigner();
  const from = await signer.getAddress();
  await shapeContract
    .connect(signer)
    .transferFrom(from, destinationAddress, id)
    .then((e) => console.log(e))
    .catch((e) => console.log(e.message));
};

// alchemy.core
//   .getTokenBalances("0x5E4a3dAfc837cFc4B0FeD7Bab4363B983CC3Cb8F")
//   .then(console.log);
