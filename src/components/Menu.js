import React from "react";
import { Menu as MuiMenu, MenuItem } from "@material-ui/core";

const Menu = ({ menuList, anchorEl, handleClose }) => {
  return (
    <MuiMenu
      id="action-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {menuList.map(({ item, cb }) => (
        <MenuItem
          key={item}
          onClick={() => {
            cb();
            handleClose();
          }}
        >
          {item}
        </MenuItem>
      ))}
    </MuiMenu>
  );
};

export default Menu;
