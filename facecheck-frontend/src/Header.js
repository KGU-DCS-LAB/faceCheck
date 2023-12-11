import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import LogoImage from "../src/assets/logo.png";

const pages = [
  { title: "출입관리시스템", link: "/access-management" },
  { title: "기능소개", link: "/feature-introduction" },
  { title: "시스템관리", link: "/system-management" },
  { title: "출입자관리", link: "/visitor-management" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            {/* Wrap the logo with Link */}
            <img
              alt="Logo"
              src={LogoImage}
              style={{
                width: "200px",
                height: "100px",
                marginRight: "1px",
                display: { xs: "none", md: "block" },
              }}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "grid" },
              gridAutoFlow: "column",
              gap: "16px",
              justifyContent: "end",
              marginLeft: { xs: "auto", md: 0 },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              color="inherit"
              onClick={handleLogin}
              component={Link}
              to="/login"
              sx={{
                backgroundColor: "gray",
                "&:hover": {
                  backgroundColor: "darkgray",
                },
              }}
            >
              관리자로그인
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
