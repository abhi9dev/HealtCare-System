import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { AiOutlineProfile, AiOutlineUserAdd } from "react-icons/ai";

import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { FcApprove } from "react-icons/fc";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./sideMenu.css";
import { display } from "@mui/system";

const SideMenu = () => {
  const { id } = useParams();
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  const [displayClick, setDisplayClick] = useState(false);
  const [approveClick, setApproveReqClick] = useState(false);
  const [registerClick, setRegisterClick] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const homeClick = (e) => {
    // e.preventDefault();
    setHomeActive(true);

    if (displayClick) {
      setDisplayClick(false);
    }
    if (approveClick) {
      setApproveReqClick(false);
    }
    if (registerClick) {
      setRegisterClick(false);
    }
  };

  const displayDataClick = (e) => {
    // e.preventDefault();
    setDisplayClick(true);

    if (homeActive) {
      setHomeActive(false);
    }
    if (approveClick) {
      setApproveReqClick(false);
    }
    if (registerClick) {
      setRegisterClick(false);
    }
  };

  const approveRequestClick = (e) => {
    // e.preventDefault();
    setApproveReqClick(true);

    if (homeActive) {
      setHomeActive(false);
    }
    if (displayClick) {
      setDisplayClick(false);
    }
    if (registerClick) {
      setRegisterClick(false);
    }
  };

  const registerDataClick = (e) => {
    // e.preventDefault();
    setRegisterClick(true);

    if (homeActive) {
      setHomeActive(false);
    }
    if (displayClick) {
      setDisplayClick(false);
    }
    if (approveClick) {
      setApproveReqClick(false);
    }
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                onClick={homeClick}
                active={homeActive}
                icon={<FiHome />}
              >
                <a href={`/admin/${id}/`}>Home</a>
              </MenuItem>
              <MenuItem
                onClick={displayDataClick}
                active={displayClick}
                icon={<FaWpforms />}
              >
                <a href={`/admin/${id}/displayData`}>Display Data</a>
              </MenuItem>
              <MenuItem
                onClick={approveRequestClick}
                active={approveClick}
                icon={<FcApprove />}
              >
                <a href={`/admin/${id}/approveRequest`}>Approve Request</a>
              </MenuItem>
              <MenuItem
                onClick={registerDataClick}
                active={registerClick}
                icon={<AiOutlineUserAdd />}
              >
                <a href={`/admin/${id}/registerUser`}>Register User</a>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>
                <a href="/">Logout</a>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideMenu;
