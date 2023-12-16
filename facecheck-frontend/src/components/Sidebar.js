import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FaceIcon from "@mui/icons-material/Face";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getMenuItems = (path) => {
    switch (true) {
      case path.startsWith("/system-management"):
        return [
          {
            text: "출입 기록 조회",
            icon: <HistoryIcon />,
            subMenus: [
              {
                text: "직원 출입 기록 조회",
                link: "/system-management/employee/accessRecord",
              },
              {
                text: "방문자 출입 기록 조회",
                link: "/system-management/visitor/accessRecord",
              },
            ],
          },
          {
            text: "얼굴 인식 카메라 관리",
            icon: <FaceIcon />,
            subMenus: [
              {
                text: "얼굴 인식 카메라 등록",
                link: "/system-management/facialRecognition/register",
              },
              {
                text: "얼굴 인식 카메라 조회",
                link: "/system-management/facialRecognition/list",
              },
            ],
          },
        ];
      case path.startsWith("/visitor-management"):
        return [
          {
            text: "출입자 등록",
            icon: <AssignmentIndIcon />,
            subMenus: [
              {
                text: "직원 등록",
                link: "/visitor-management/employee/register",
              },
              {
                text: "방문자 등록",
                link: "/visitor-management/visitor/register",
              },
            ],
          },
          {
            text: "출입자 관리",
            icon: <GroupIcon />,
            subMenus: [
              {
                text: "직원 조회",
                link: "/visitor-management/employee/list",
              },
              {
                text: "방문자 조회",
                link: "/visitor-management/visitor/list",
              },
            ],
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(currentPath);
  const drawerWidth = 250;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, marginTop: "105px" },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "Noto Serif KR, serif" }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
            <List component="div" disablePadding>
              {item.subMenus.map((subItem, subIndex) => (
                <ListItem
                  key={subIndex}
                  button
                  component={Link}
                  to={subItem.link}
                  sx={{ pl: 4 }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Noto Serif KR, serif" }}
                      >
                        {subItem.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
