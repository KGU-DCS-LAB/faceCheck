import React, {useEffect, useRef, useState} from "react";
import {
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

const Department:React.FC = () => {

    const [departments, setDepartments] = useState<string[]>([])
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editDepartment, setEditDepartment] = useState("");
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
                    console.log(response.data.department)
                    setDepartments(response.data.department)
                }else{
                    alert('부서 정보 가져오기를 실패했습니다.')
                }
            })
    }, [])

    const onEditChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditDepartment(e.target.value);
    }

    const onEditSave = (department : string , index : number) => {
        if (editDepartment.length < 1) {
            setEditDepartment(department);      //수정하지 않고 엔터를 눌렀을 경우 기존 부서 이름이 저장되도록 하기 위함
            return;
        }

        const variable = {
            name: department,
            changeName: editDepartment,
        }

        Axios.patch("/admin/department/update", variable, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then((response: AxiosResponse<String>) => {
            if(response.status === 200){
                setDepartments(prevDepartments => {
                    const newDepartments = [...prevDepartments];
                    newDepartments[index] = editDepartment;
                    return newDepartments;
                });
                setEditIndex(null);
                setEditDepartment("");
            }
        })
    }

    const onCheckEnter = (department : string , index : number) =>  (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            onEditSave(department, index)
        }
    }

    const onDelete = (department:string) => {

        const variables = {
            department : department,
        }

        Axios.delete("/admin/department", {
            data : variables,
            headers :  {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then(response => {
            if(response.status === 200) {
                setDepartments(prevDepartments => prevDepartments.filter(department => department !== variables.department));
                Swal.fire({
                    icon: "success",
                    title: "부서 삭제 성공",
                    text: "부서가 성공적으로 삭제되었습니다.",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "부서 삭제 실패",
                    text: "부서 삭제에 실패했습니다.",
                });
            }
        })
    }

    const onEditState = (index:number) => {
        setEditIndex(index);
    }


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
                            {
                                editIndex === index?
                                    <TableCell align="center" style={{ padding: "0px", margin: "0px", width: "43%"}}>
                                        <TextField
                                            label="edit"
                                            defaultValue={department}
                                            onChange={onEditChange}
                                            onKeyDown={onCheckEnter(department, index)}
                                            inputRef={inputRef}
                                        />
                                    </TableCell>
                                    :
                                    <TableCell align="center">{department}</TableCell>
                            }
                            {
                                editIndex === index?
                                    <TableCell align="right"><SaveAsOutlinedIcon onClick={() => onEditSave(department, index)} /></TableCell>
                                    :
                                    <TableCell align="right"><EditOutlinedIcon onClick={() => onEditState(index)} /></TableCell>
                            }
                            <TableCell align="center"><DeleteOutlineOutlinedIcon onClick={() => onDelete(department)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Department
