import React, { useState, useEffect } from "react";
import { NFTCard } from "../components/nftCard";
import { Dna } from "react-loader-spinner";

export const NFTAlbum = ({ nfts, setSelectedTokenId, loading }) => {
  const [listUnique, setListUnique] = useState([]);
  const [listRepeated, setListRepeated] = useState([]);
  // this will not be necessary when album has 'slots'
  const order = [
    "banner",
    "brick",
    "circle",
    "cross",
    "crown",
    "portal",
    "shield",
    "square",
    "triangle",
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

    order.forEach((shape, i) => {
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
          slot: i + 1,
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
    <div
      id="main"
      className="grid grid-cols-2 gap-x-6 max-w-5xl m-2 relative max-h-[88vh]"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Dna
          visible={loading}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      <div>
        <h2 className="text-center bg-slate-300 mt-4">album</h2>
        <div
          className={`flex flex-wrap gap-y-2 mt-4 gap-x-2 justify-center ${
            loading ? "opacity-40" : "opacity-100"
          }`}
        >
          {listUnique.length &&
            listUnique.map((nft, i) => {
              return (
                <div className="w-1/4 flex flex-col" key={nft.tokenId}>
                  <NFTCard
                    nft={nft}
                    setSelectedTokenId={setSelectedTokenId}
                  ></NFTCard>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h2 className="text-center bg-slate-300 mt-4">repetidas</h2>
        <div
          className={`flex flex-wrap gap-y-2 mt-4 gap-x-2 justify-center overflow-y-auto max-h-[73vh] ${
            loading ? "opacity-40" : "opacity-100"
          }`}
        >
          {listRepeated.length &&
            listRepeated.map((nft, i) => {
              return (
                <div className="w-1/6 flex flex-col" key={nft.tokenId}>
                  <NFTCard
                    nft={nft}
                    setSelectedTokenId={setSelectedTokenId}
                  ></NFTCard>
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
