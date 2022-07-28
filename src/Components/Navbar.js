import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import WatchList from "./WatchList";

function Navbar() {
  return (
    <div className="bg-slate-700">
      <nav className="flex justify-between ml-6 mr-6 text-m">
        <Link className="py-7 text-white" to={"/"}>
          <p>
            CRYPTO <strong className="italic">WORLD</strong>
          </p>
        </Link>

        <ul className="px-2 py-6 flex space-x-8 justify-end text-white">
          <li className="py-1 cursor-pointer">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="py-1 cursor-pointer">
            <HashLink smooth={true} to={"#News"}>
              News
            </HashLink>
          </li>

          <li>{<WatchList />}</li>
        </ul>
      </nav>
      <div className="flex-grow h-px bg-gray-800"></div>
    </div>
  );

  //npm install @mui/icons-material
}

export default Navbar;
