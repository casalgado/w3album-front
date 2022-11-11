import React, { useState, useEffect } from "react";
import { NFTCard } from "../components/nftCard";

export const NFTAlbum = ({ nfts }) => {
  const [listUnique, setListUnique] = useState([]);
  const [listRepeated, setListRepeated] = useState([]);
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
    "final",
  ];

  useEffect(() => {
    const stickerList = {};
    const unique = [];
    const repeated = [];
    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i];
      const shape = nft.shape;
      if (stickerList[shape]) {
        stickerList[shape].push(nft);
      } else stickerList[shape] = [nft];
    }
    console.log("in Album:", stickerList);

    order.forEach((shape) => {
      //console.log(shape);
      if (stickerList[shape]) {
        unique.push(stickerList[shape][0]);

        if (stickerList[shape].length >= 2) {
          for (let i = 1; i < stickerList[shape].length; i++) {
            repeated.push(stickerList[shape][i]);
          }
        }
      } else {
        unique.push({
          title: " - . - ",
          image: "placeholder.svg",
          tokenId: shape,
          shape: "",
          stuck: "",
        });
      }
    });
    // console.log("unique", unique);
    setListUnique(unique);
    // console.log("repeated", repeated);
    setListRepeated(repeated);
  }, [nfts]);

  return (
    <div className="grid grid-cols-2 gap-x-6">
      <div>
        <h2 className="text-center bg-slate-300 mt-4">album</h2>
        <div className="flex flex-wrap gap-y-2 mt-4 gap-x-2 justify-center">
          {listUnique.length &&
            listUnique.map((nft, i) => {
              return (
                <div className="w-1/4 flex flex-col" key={nft.tokenId}>
                  <NFTCard nft={nft}></NFTCard>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h2 className="text-center bg-slate-300 mt-4">repetidas</h2>
        <div className="flex flex-wrap gap-y-2 mt-4 gap-x-2 justify-center">
          {listRepeated.length &&
            listRepeated.map((nft, i) => {
              return (
                <div className="w-1/6 flex flex-col" key={nft.tokenId}>
                  <NFTCard nft={nft}></NFTCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

/*        
{NFTs.length &&
          NFTs.map((nft, i) => {
            return <NFTCard nft={nft} key={i}></NFTCard>;
          })}
          */
