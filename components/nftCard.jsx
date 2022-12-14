export const NFTCard = ({ nft, setSelectedTokenId }) => {
  return (
    <div className="rounded-md" onClick={() => setSelectedTokenId(nft.tokenId)}>
      <img
        className="object-cover h-128 w-full rounded-t-md"
        src={nft.image}
      ></img>
      <h2 className="text-xs text-center text-gray-800">{`${
        nft.slot == "" ? "Select a Shape" : `Shape # ${nft.slot}`
      }`}</h2>
    </div>
  );
};

/*

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

  const [copied, setCopied] = useState(false);

  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const truncateEthAddress = (address) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

    <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {parseInt(nft.tokenId, 16)}</p>

          <p className="text-gray-600">
            <CopyToClipboard
              text={nft.contract.address}
              onCopy={() => handleCopy()}
            >
              <button className="cursor:pointer inline">
                <img src="copy.png" alt="Copy to Clipboard Icon" />
              </button>
            </CopyToClipboard>
            {truncateEthAddress(nft.contract.address)}
            {copied && (
              <span className="ml-4 bg-slate-400 px-2 py-1 text-slate-800 rounded-xl">
                copied
              </span>
            )}
          </p>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>


 */
