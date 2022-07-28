import { Divider } from "@mui/material";
import React, { useContext } from "react";
import { Cartlist } from "../Context";

const Listrow = () => {
  const { clist, setClist } = useContext(Cartlist);
  const removeCoin = (coin_name) => {
    setClist(clist.filter((item) => item.n !== coin_name));
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const imageUrl =
    "https://media.istockphoto.com/photos/bitcoin-picture-id1145592969?k=20&m=1145592969&s=612x612&w=0&h=D4rZ3SSQ8FZYuZu-xXDOqXqUzR7dgBxA3PCOy8GUfYM=";
  return (
    <div className="m-2">
      <img className="rounded-xl mb-2" src={imageUrl} alt="image" />

      {clist.map((item) => (
        <div className="mb-1 flex justify-between bg-green-500 p-1 rounded-md pl-2 pr-2 hover:bg-purple-500">
          <span>{item.n.toUpperCase()}</span>
          <span>${numberWithCommas(item.p)}</span>
          <img
            onClick={() => removeCoin(item.n)}
            src="cancel.png"
            alt=""
            className="h-4 w-4 m-1 cursor-pointer"
          />
        </div>
      ))}

      <Divider />
    </div>
  );
};

export default Listrow;
