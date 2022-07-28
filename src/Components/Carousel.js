import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../Api/Constant";

const Carousel = () => {
  const handleDragStart = (e) => e.preventDefault();
  const [trending, setTrending] = useState([]);
  const symbol = "₹";
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins("USD"));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [""]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        className="flex flex-col items-center  text-sm bg-slate-100 hover:bg-blue-200 rounded-lg px-5 py-6 m-3 ring-1 ring-slate-900/5 shadow-xl mt-10 mb-10"
        to={`/coins/${coin.id}`}
      >
        <img
          className="m-2 w-10 h-10"
          src={coin?.image}
          alt={coin.name}
          height="80"
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="text-xl font-medium">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  //////////////////////////////////////

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div>
      <AliceCarousel
        mouseTracking
        items={items}
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
