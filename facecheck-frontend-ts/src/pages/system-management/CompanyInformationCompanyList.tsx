import React from "react";
import {Box, Tab, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Department from "./company-information/Department";
import Position from "./company-information/Position";


const CompanyInformationCompanyList:React.FC = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
            <div style={marginStyle}>
                <Typography variant="h5" style={titleStyle}>
                    전체 회사 정보 조회
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="부서" value="1" />
                                <Tab label="직급" value="2" />
                                <Tab label="카메라" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel style={{margin: "25px"}} value="1"><Department /></TabPanel>
                        <TabPanel style={{margin: "25px"}} value="2"><Position /></TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )


}

export default CompanyInformationCompanyList;