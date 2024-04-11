import React, {useEffect, useState} from "react";
import {
    Button, Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Axios from "axios";
import Cookies from "js-cookie";
import {AxiosResponse} from "axios/index";
import Swal from "sweetalert2";


const EmployeeRequest:React.FC = () => {

    const [pendingEmployee, setPendingEmployee] = useState([]);

    const titleStyle = {
        fontWeight: "bold",
        fontFamily: "Noto Serif KR, serif",
        marginBottom: "40px"
    };

    const marginStyle = {
        margin: "50px",
    };

    useEffect(() => {
        Axios.get('/admin/employee/approve', {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if(response.data) {
                    console.log(response.data)
                    setPendingEmployee(response.data)
                }else{
                    alert('직원 정보 가져오기를 실패했습니다.')
                }
            })
    }, [])

    const onClickApprove = (number:string) => {
        Axios.post(`/admin/employee/approve/${number}`, null, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then((response: AxiosResponse<String>) => {
            if(response.status === 200) {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "직원 승인 성공",
                    text: "성공적으로 승인되었습니다.",
                });
            }
        }).catch((error: any) => {
            if(error.response.status === 400) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "직원 승인 실패",
                    text: error.response.data,
                });
            }
        })
    }

    interface employeeType {
        name: string;
        camera: Array<String>;
        department: string;
        position: string;
        number: string;
        imageURL: string;
    }

    return (
        <div>
            {/*직원 승인 요청*/}
            <div style={marginStyle}>
                <Typography variant="h5" style={titleStyle}>
                    직원 승인 요청
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>직원 이름</TableCell>
                                <TableCell align="right">사번</TableCell>
                                <TableCell align="right">부서</TableCell>
                                <TableCell align="right">직급</TableCell>
                                <TableCell align="right">출입가능카메라</TableCell>
                                <TableCell align="right">직원이미지url</TableCell>
                                <TableCell align="right">승인</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingEmployee.map((employee : employeeType, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{employee.name}</TableCell>
                                    <TableCell align="right">{employee.number}</TableCell>
                                    <TableCell align="right">{employee.department}</TableCell>
                                    <TableCell align="right">{employee.position}</TableCell>
                                    <TableCell align="right">{employee.camera}</TableCell>
                                    <TableCell align="right">{employee.imageURL}</TableCell>
                                    <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{
                                            width: "10%",
                                            marginLeft: "1px"
                                        }}
                                        onClick = {() => onClickApprove(employee.number)}
                                    >
                                        승인
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default EmployeeRequest;