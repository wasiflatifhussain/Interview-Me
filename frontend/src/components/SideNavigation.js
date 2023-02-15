
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCog, FaUserTie, FaColumns, FaThList } from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import "./SideNavigation.scss";
import { RiPagesLine,RiLogoutBoxRFill } from "react-icons/ri";
import { BsFillPersonBadgeFill, BsVectorPen } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";




const Menuitem = styled(MenuItem)`
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
    ${'' /* padding: 5px;
    border-radius: 10px; */}
  }
`;

const SideNavigation = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const styles = {
    sideBarHeight: {
      height: "145vh"
    },
    menuIcon: {
      float: "left",
      marginBottom: "10px",
      marginLeft: "10px",
      paddingLeft: "5px",
    },
    
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    
    sessionStorage.removeItem("token");
    navigate("/prompt")
  }
  return (
    <div>

    {/* <Navbar /> */}

    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
    
      <SidebarHeader>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
      </SidebarHeader>
      <Menu iconShape="square" className="sideMain">
        <Menuitem icon={<FaColumns />}>
        <Link to="/">Home</Link>
        </Menuitem>
        <Menuitem icon={<FaUserTie />} href="/employees">
          <Link to="/resume">Resume </Link>
        </Menuitem>
        <Menuitem icon={<RiPagesLine />}>
          <Link to="/covers">Cover Letter</Link>
        </Menuitem>
        <Menuitem icon={<BsFillPersonBadgeFill />}>
          <Link to="/interviews">Live Interviews</Link>
        </Menuitem>
      </Menu>

      <Menu iconShape="square" className="sideSide">
        <Menuitem icon={<RiLogoutBoxRFill />} onClick={logout}>Logout</Menuitem>
      </Menu>
    </ProSidebar>
    </div>
  );
};
export default SideNavigation;
