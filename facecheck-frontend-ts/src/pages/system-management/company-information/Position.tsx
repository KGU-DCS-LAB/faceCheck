import React, {useEffect, useRef, useState} from "react";
import {
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import Axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import Swal from "sweetalert2";
import {AlertTitle} from "@mui/lab";

const Position:React.FC = () => {

    const [positions, setPositions] = useState<string[]>([])
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editPosition, setEditPosition] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        Axios.get('/admin/company', {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if(response.data) {
                    console.log(response.data.position)
                    setPositions(response.data.position)
                }else{
                    alert('직급 정보 가져오기를 실패했습니다.')
                }
            })
    }, [])

    const onEditChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditPosition(e.target.value);
    }

    const onEditSave = (department : string , index : number) => {
        if (editPosition.length < 1) {
            setEditPosition(department);      //수정하지 않고 엔터를 눌렀을 경우 기존 직급 이름이 저장되도록 하기 위함
            return;
        }

        const variable = {
            name: department,
            changeName: editPosition,
        }

        Axios.patch("/admin/position/update", variable, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then((response: AxiosResponse<String>) => {
            if(response.status === 200){
                setPositions(prevPositions => {
                    const newPositions = [...prevPositions];
                    newPositions[index] = editPosition;
                    return newPositions;
                });
                setEditIndex(null);
                setEditPosition("");
            }
        })
    }

    const onCheckEnter = (position : string , index : number) =>  (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            onEditSave(position, index)
        }
    }

    const onDelete = (position:string) => {

        const variables = {
            position : position,
        }

        Axios.delete("/admin/position", {
            data : variables,
            headers :  {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then(response => {
            if(response.status === 200) {
                setPositions(prevPositions => prevPositions.filter(position => position !== variables.position));
                Swal.fire({
                    icon: "success",
                    title: "직급 삭제 성공",
                    text: "직급이 성공적으로 삭제되었습니다.",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "직급 삭제 실패",
                    text: "직급 삭제에 실패했습니다.",
                });
            }
        })
    }

    const onEditState = (index:number) => {
        setEditIndex(index);
    }


    return(
        <div>
            <Alert severity="info">
                이 페이지에서 직급 정보 조회, 수정, 삭제를 할 수 있습니다.
            </Alert>

            <TableContainer component={Paper} sx={{width: "100%", marginTop : "20px"}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell align="center">Position Name</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {positions.map((position, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{ height : "70px" }}
                            >
                                <TableCell component="th" scope="row">{index+1}</TableCell>
                                {
                                    editIndex === index?
                                        <TableCell align="center" style={{ padding: "0px", margin: "0px", width: "43%"}}>
                                            <TextField
                                                label="edit"
                                                defaultValue={position}
                                                onChange={onEditChange}
                                                onKeyDown={onCheckEnter(position, index)}
                                                inputRef={inputRef}
                                            />
                                        </TableCell>
                                        :
                                        <TableCell align="center">{position}</TableCell>
                                }
                                {
                                    editIndex === index?
                                        <TableCell align="right"><SaveAsOutlinedIcon onClick={() => onEditSave(position, index)} /></TableCell>
                                        :
                                        <TableCell align="right"><EditOutlinedIcon onClick={() => onEditState(index)} /></TableCell>
                                }
                                <TableCell align="center"><DeleteOutlineOutlinedIcon onClick={() => onDelete(position)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Position
