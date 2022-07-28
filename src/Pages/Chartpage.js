import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cryptoName } from "../Api/Constant";
import Cryptochart from "../Components/Cryptochart";

const Chartpage = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState();

  const getData = async () => {
    const { data } = await axios.get(cryptoName(id));

    setCrypto(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-center">
          <img
            className="h-56 w-56 mt-4"
            src={crypto?.image.large}
            alt={crypto?.name}
          />
        </div>
        <h1 className="text-center text-lg p-1 font-bold">
          {crypto?.name.toUpperCase()}
        </h1>

        <h1 className="text-center text-lg text-violet-500">
          TWITTER FOLLWERS::{crypto?.community_data.twitter_followers}
        </h1>

        <h1 className="text-center text-lg text-violet-500">
          CURRENT PRICE::${crypto?.market_data.current_price.usd}
        </h1>
        <h1 className="text-center text-lg text-violet-500">ID:: {crypto?.id.toUpperCase()}</h1>

        <div
          className="text-center bg-slate-50 m-2 rounded-lg px-5 py-6  ring-1 ring-slate-500/5 shadow-xl mt-10 mb-10"
          dangerouslySetInnerHTML={{ __html: crypto?.description.en }}
        />
      </div>
      <Cryptochart id={id} />
    </div>
  );
};

export default Chartpage;
