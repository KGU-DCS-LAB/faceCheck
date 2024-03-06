import React from "react";
import {
    Box,
    Button,
    InputLabel, Paper, styled,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";

const EmployeeRequest:React.FC = () => {

    const titleStyle = {
        fontWeight: "bold",
        fontFamily: "Noto Serif KR, serif",
        marginBottom: "40px"
    };

    const marginStyle = {
        margin: "50px",
        //OverflowY: "scroll", // 스크롤을 허용하는 스타일 추가
        //maxHeight: "calc(100vh - 200px)" // 스크롤 영역의 최대 높이 설정 (원하는 높이로 조절)
    };

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
    ) {
        return { name, calories, fat, carbs};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24),
        createData('Ice cream sandwich', 237, 9.0, 37),
        createData('Eclair', 262, 16.0, 24),
        createData('Cupcake', 305, 3.7, 67),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
        createData('Gingerbread', 356, 16.0, 49),
    ];

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
                                <TableCell align="right">승인</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{
                                            width: "10%",
                                            marginLeft: "1px"
                                        }}
                                        //onClick={onClick}
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