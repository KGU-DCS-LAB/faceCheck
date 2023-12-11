import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { text: "출입자 등록", icon: <AssignmentIndIcon />, link: "/register" },
    { text: "출입자 관리", icon: <GroupIcon />, link: "/management" },
    { text: "출입 기록 조회", icon: <HistoryIcon />, link: "/history" },
    {
      text: "얼굴 인식 카메라 관리",
      icon: <CameraAltIcon />,
      link: "/faceRecognition",
    },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} button component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
