import React, {useEffect, useState} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Axios from "axios";
import Cookies from "js-cookie";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Department:React.FC = () => {

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        Axios.get('/admin/company', {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if(response.data) {
                    console.log(response.data.department)
                    setDepartments(response.data.department)
                }else{
                    alert('부서 정보 가져오기를 실패했습니다.')
                }
            })
    }, [])

    return(
        <TableContainer component={Paper} sx={{width: "100%"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell align="center">Department Name</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.map((department, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            style={{ height : "70px" }}
                        >
                            <TableCell component="th" scope="row">{index+1}</TableCell>
                            <TableCell align="center">{department}</TableCell>
                            <TableCell align="right"><EditOutlinedIcon /></TableCell>
                            <TableCell align="center"><DeleteOutlineOutlinedIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Department