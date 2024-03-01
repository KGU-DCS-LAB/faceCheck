import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import FaceIcon from "@mui/icons-material/Face";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import { Link } from "react-router-dom";


const Sidebar: React.FC = () => {

    const location = useLocation();
    const currentPath = location.pathname;
    const [isBlurred, setIsBlurred] = useState(false);

    const getMenuItems = (path:String) => {
        switch (true) {
            case path.startsWith("/system-management") :
                return [
                    {
                        text: "출입 기록 조회",
                        icon: <HistoryIcon/>,
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
                        icon: <FaceIcon/>,
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
                    {
                        text: "회사 정보 등록",
                        icon: <BusinessIcon/>,
                        subMenus: [
                            {
                                text: "회사 정보 입력",
                                link: "/system-management/companyInformation/enter",
                            },
                            {
                                text: "카메라 등록",
                                link: "/system-management/companyInformation/camera",
                            },
                            {
                                text: "전체 회사 정보 조회",
                                link: "/system-management/companyInformation/companyList",
                            },
                        ],
                    },
                ];
            case path.startsWith("/visitor-management"):
                return [
                    {
                        text: "출입자 등록",
                        icon: <AssignmentIndIcon/>,
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
                        text: "출입자 조회",
                        icon: <GroupIcon/>,
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
                    {
                        text: "승인 요청 목록",
                        icon: <CheckCircleIcon/>,
                        subMenus: [
                            {
                                text: "직원 승인 요청",
                                link: "/visitor-management/employee/request",
                            },
                            {
                                text: "방문자 승인 요청",
                                link: "/visitor-management/visitor/request",
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
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    marginTop: "105px",
                    backdropFilter: isBlurred ? "blur(5px)" : "none",
                    backgroundColor: isBlurred
                        ? "rgba(255, 255, 255, 0.8)"
                        : "transparent",
                },
                transition: "backdrop-filter 0.3s ease",
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
}

export default Sidebar;