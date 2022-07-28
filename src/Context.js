import { createContext, useState } from "react";

export const Cartlist = createContext();

const Context = (props) => {
  const [clist, setClist] = useState([]);

  return (
    <Cartlist.Provider value={{ clist, setClist }}>
      {props.children}
    </Cartlist.Provider>
  );
};

export default Context;
