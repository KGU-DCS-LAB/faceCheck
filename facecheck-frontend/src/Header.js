import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoImage from "../src/assets/logo.png";
import { Link } from "react-router-dom";

const pages = [
  { title: "출입관리시스템", link: "/access-management" },
  { title: "기능소개", link: "/feature-introduction" },
  { title: "시스템관리", link: "/system-management" },
  { title: "출입자관리", link: "/visitor-management" },
];

function Header() {
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
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
                  textDecoration: "none",
                }}
              >
                {page.title}
              </Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
            {" "}
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
              관리자로그인
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
