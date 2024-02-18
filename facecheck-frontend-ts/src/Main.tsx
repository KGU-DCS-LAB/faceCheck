import React from "react";
import Grid from "@mui/material/Grid";

import LogoImage from "../src/assets/logo.png";
import MainImage from "../src/assets/main.png";

const Home = () => {
    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid
                item
                xs={12}
                md={4}
                textAlign="center"
                style={{
                    position: "relative",
                    zIndex: 2, // Set a higher zIndex value
                    marginBottom: "-50px", // Adjust the margin as needed
                }}
            >
                <img
                    src={LogoImage}
                    alt="Logo"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        position: "relative",
                        top: "-50%", // Adjust the top position as needed
                    }}
                />
            </Grid>

            <Grid
                item
                xs={12}
                md={8}
                textAlign="center"
                style={{ position: "relative", zIndex: 1 }}
            >
                <img
                    src={MainImage}
                    alt="Main"
                    style={{
                        width: "100%",
                        height: "auto",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: 0.4,
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Home;