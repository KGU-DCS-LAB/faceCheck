import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import LogoImage from "../src/assets/logo.png";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const pages = [
    { title: "출입관리시스템", link: "/access-management" },
    { title: "시스템관리", link: "/system-management" },
    { title: "출입자관리", link: "/visitor-management" },
];

function Header() {

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

    const [cookies, setCookie, removeCookie] = useCookies(["userId"])

    const handleLogout = () => {
        removeCookie("userId")
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "white",
                color: "black",
                zIndex: 2,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit"}}>
                        <img
                            alt="Logo"
                            src={LogoImage}
                            style={{
                                width: "200px",
                                height: "100px",
                                marginRight: "1px",
                                display: isMdScreen ? "block" : "none"
                            }}
                        />
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            //display: isMdScreen ? "grid" : "none",
                            display: "grid",
                            gridAutoFlow: "column",
                            gap: "16px",
                            justifyContent: "end",
                            marginLeft: { xs: "auto", md: 0},
                        }}
                    >
                        {pages.map((page) => (
                            <Typography
                                key={page.title}
                                component={Link}
                                to={page.link}
                                variant="body1"
                                sx={{
                                    my: 2,
                                    color: "black",
                                    display: "block",
                                    fontFamily: "Noto Serif KR, serif",
                                    textDecoration: "none"
                                }}
                            >
                                {page.title}
                            </Typography>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
                        {cookies.userId ? (     //userId 쿠키가 존재하면 마이페이지 버튼 표시
                            <Button
                               color="inherit"
                               component={Link}
                               to="/mypage"
                               sx={{
                                   backgroundColor: "gray",
                                   "&:hover": {
                                       backgroundColor: "darkgray",
                                   },
                                   fontFamily: "Noto Serif KR, serif",
                                   textDecoration: "none",
                                   marginRight: 1,
                               }}
                            >
                                {cookies.userId} 님
                            </Button>
                        ) : (       //userId 쿠키가 존재하지 않으면 로그인 버튼 표시
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                                sx={{
                                    backgroundColor: "gray",
                                    "&:hover": {
                                        backgroundColor: "darkgray",
                                    },
                                    fontFamily: "Noto Serif KR, serif",
                                    textDecoration: "none",
                                }}
                            >
                                로그인
                            </Button>
                        )}
                        {cookies.userId && (
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                component={Link}
                                to="/"
                                sx={{
                                    backgroundColor: "gray",
                                    "&:hover": {
                                        backgroundColor: "darkgray",
                                    },
                                    fontFamily: "Noto Serif KR, serif",
                                    textDecoration: "none",
                                }}
                            >
                                로그아웃
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
