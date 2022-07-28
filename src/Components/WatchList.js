import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Badge } from "@mui/material";
import Listrow from "./Listrow";
import { Cartlist } from "../Context";
import { useContext } from "react";

export default function WatchList() {
  const { clist } = useContext(Cartlist);

  const anchor = "right";
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Listrow />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Badge
          onClick={toggleDrawer(anchor, true)}
          color="secondary"
          badgeContent={clist.length}
        >
          <img
            className="w-8 h-8 rounded-full cursor-pointer "
            src="cart_icon.png"
          />
        </Badge>

        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
