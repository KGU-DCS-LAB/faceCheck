import React from "react";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import DepartmentRegister from "./DepartmentRegister";
import PositionRegister from "./PositionRegister";

const CompanyInformationEnter:React.FC = () => {

    const titleStyle = {
        fontWeight: "bold",
        fontFamily: "Noto Serif KR, serif",
        marginBottom: "40px"
    };

    const marginStyle = {
        margin: "50px",
    };

    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <div style={marginStyle}>
                        <Typography variant="h5" style={titleStyle}>
                            부서 등록
                        </Typography>
                        <DepartmentRegister />
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div style={marginStyle}>
                            <Typography variant="h5" style={titleStyle}>
                                직급 등록
                            </Typography>
                            <PositionRegister />
                        </div>
                    </Grid>
            </Grid>
        </div>
    )

}

export default CompanyInformationEnter;