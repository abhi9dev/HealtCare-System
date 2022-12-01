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

const SideMenu = () => {
  const { id } = useParams();
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  const [historyActive, setHistoryActive] = useState(false);
  const [nearbyDocActive, setNearbyDocActive] = useState(false);
  const [editProfActive, setEditProfActive] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const homeClick = (e) => {
    // e.preventDefault();
    setHomeActive(true);

    if (historyActive) {
      setHistoryActive(false);
    }
    if (nearbyDocActive) {
      setNearbyDocActive(false);
    }
    if (editProfActive) {
      setEditProfActive(false);
    }
  };

  const historyClick = (e) => {
    // e.preventDefault();
    setHistoryActive(true);

    if (homeActive) {
      setHomeActive(false);
    }
    if (nearbyDocActive) {
      setNearbyDocActive(false);
    }
    if (editProfActive) {
      setEditProfActive(false);
    }
  };

  const nearbyDocClick = (e) => {
    // e.preventDefault();
    setNearbyDocActive(true);

    if (homeActive) {
      setHomeActive(false);
    }
    if (historyActive) {
      setHistoryActive(false);
    }
    if (editProfActive) {
      setEditProfActive(false);
    }
  };

  const editProfClick = (e) => {
    // e.preventDefault();
    setEditProfActive(true);

    if (homeActive) {
      setHomeActive(false);
    }
    if (historyActive) {
      setHistoryActive(false);
    }
    if (nearbyDocActive) {
      setNearbyDocActive(false);
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
                onClick={historyClick}
                active={historyActive}
                icon={<FaWpforms />}
              >
                <a href={`/admin/${id}/displayData`}>Display Data</a>
              </MenuItem>
              <MenuItem
                onClick={nearbyDocClick}
                active={nearbyDocActive}
                icon={<FcApprove />}
              >
                <a href={`/admin/${id}/approveRequest`}>Approve Request</a>
              </MenuItem>
              <MenuItem
                onClick={nearbyDocClick}
                active={nearbyDocActive}
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
