import React, { useState, useEffect } from "react";
import { NFTCard } from "../components/nftCard";

export const NFTAlbum = ({ nfts }) => {
  // this will not be necessary when album has 'slots'
  const order = [
    "circle",
    "square",
    "triangle",
    "banner",
    "portal",
    "shield",
    "cross",
    "crown",
    "brick",
    "complete",
  ];

  const template = {
    title: " - . - ",
    image: "placeholder.svg",
    address: "",
    id: "",
  };

  const stickerList = {};

  useEffect(() => {
    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i];
      const shape = nft.rawMetadata.attributes[0].value;
      if (stickerList[shape]) {
        stickerList[shape].push(nft);
      } else stickerList[shape] = [nft];
    }
    console.log("in Album:", stickerList);
  }, [nfts]);

  return (
    <div className="flex flex-wrap gap-y-2 mt-4 gap-x-2 justify-center">
      {nfts.length &&
        nfts.map((nft, i) => {
          return <NFTCard nft={nft} key={i}></NFTCard>;
        })}
    </div>
  );
};

/*        
{NFTs.length &&
          NFTs.map((nft, i) => {
            return <NFTCard nft={nft} key={i}></NFTCard>;
          })}
          */
