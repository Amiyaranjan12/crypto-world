import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { CoinList } from "../Api/Constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cartlist } from "../Context";
const Table = () => {
  /////////////
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { clist, setClist } = useContext(Cartlist);
  const symbol = "$";
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList("USD"));

    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
  }, ["USD"]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const addCoin = (name, price) => {
    setClist([...clist, { n: name, p: price }]);
  };
  return (
    <div>
      <div className="flex justify-center mb-4 ">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            className="
            ring-1 
            ring-slate-900/5 
            shadow-xl
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-slate-200 bg-clip-padding
             border border-solid border-gray-300
             rounded-lg
             transition
             ease-in-out
             m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleSearch"
            placeholder="Type query"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col bg-slate-100 m-2 rounded-lg px-5 py-6  ring-1 ring-slate-900/5 shadow-xl mt-10 mb-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-slate-300">
                  <tr>
                    {[
                      "Coin",
                      "Price",
                      "24h Change",
                      "Market Cap",
                      "Watchlist",
                    ].map((head) => (
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <tr className="hover:bg-blue-200" key={row.symbol}>
                          <td className="flex gap-6 mt-7 px-4">
                            <Link to={`/coins/${row.id}`}>
                              <img
                                src={row?.image}
                                alt={row.name}
                                className=" w-10 h-10"
                              />
                              <div className="flex flex-col text-sm ">
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>
                            </Link>
                          </td>
                          <td className="align-right pt-3 pl-2">
                            <Link to={`/coins/${row.id}`}>
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </Link>
                          </td>
                          <td
                            className="pt-3 pl-8"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            <Link to={`/coins/${row.id}`}>
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </Link>
                          </td>
                          <td className="pt-3 pl-5">
                            <Link to={`/coins/${row.id}`}>
                              {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                            </Link>
                          </td>

                          <td className="pt-3 pl-7">
                            <button
                              onClick={() =>
                                addCoin(
                                  row.symbol,
                                  row.current_price.toFixed(2)
                                )
                              }
                              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 text-sm border border-blue-500 hover:border-transparent rounded"
                            >
                              ADD
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Pagination
          count={handleSearch()?.length / 10}
          color="primary"
          variant="outlined"
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </div>
    </div>
  );
};

export default Table;
