import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import menu from "../assets/images/menu.svg";
import appointment from "../assets/images/appointment.png";
import { FaList, FaRegHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { ImProfile } from "react-icons/im";

import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiMail,
} from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideMenu.css";

const SideMenu = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  const [historyActive, setHistoryActive] = useState(false);
  const [nearbyDocActive, setNearbyDocActive] = useState(false);
  const [editProfActive, setEditProfActive] = useState(false);
  const { id } = useParams();

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
                <a href={`/user/${id}/`}>Home</a>
              </MenuItem>
              <MenuItem
                onClick={historyClick}
                active={historyActive}
                icon={<FaWpforms />}
              >
                <a href={`/user/${id}/history`}>Medical History</a>
              </MenuItem>
              <MenuItem
                onClick={nearbyDocClick}
                active={nearbyDocActive}
                icon={<GrLocation />}
              >
                <a href={`/user/${id}/nearDoc`}>Nearby Doctors</a>
              </MenuItem>
              <MenuItem
                onClick={editProfClick}
                active={editProfActive}
                icon={<ImProfile />}
              >
                <a href={`/user/${id}/editProfile`}>Edit Profile</a>
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
