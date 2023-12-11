import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "../../src/style.css";
import WelcomeToFacecheckImage from "../assets/welcomeToFacecheck.png";

export default function Login() {
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div
        className="background-image"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <div className="logo" style={{ flex: "0 0 auto", marginTop: "20px" }}>
          <img
            src={WelcomeToFacecheckImage}
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className="your-component"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "60%",
              minHeight: 350,
              position: "relative",
              zIndex: 2,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: "Kalnia",
                  fontWeight: "bold",
                }}
              >
                Login
              </Typography>
              <form>
                <TextField
                  id="standard-basic"
                  label="ID"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{ width: "100%" }}
                />

                <TextField
                  id="standard-basic"
                  label="PASSWORD"
                  type="password"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{ width: "100%" }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Link
                    component={RouterLink}
                    to="/signup"
                    sx={{ color: "#9FB9DE" }}
                  >
                    아직 회원이 아니라면?
                  </Link>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      fontFamily: "Kalnia",
                      backgroundColor: "#9FB9DE",
                      "&:hover": {
                        backgroundColor: "#7487A7",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
