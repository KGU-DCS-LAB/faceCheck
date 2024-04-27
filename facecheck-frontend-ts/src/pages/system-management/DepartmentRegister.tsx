import React, {useRef, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import Axios from "axios";
import {AxiosResponse} from "axios/index";
import Cookies from "js-cookie";

const DepartmentRegister:React.FC = () => {
    const [department, setDepartment] = useState<String>("");
    const [departmentList, setDepartmentList] = useState<String[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const onchange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
    }

    const onDelete = (item:String) => {
        setDepartmentList(departmentList.filter(v => v !== item));
    }

    const onCheckEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            if (department.length < 1) {
                if(inputRef.current !== null) {
                    inputRef.current.focus();
                }
                return;
            }
            setDepartmentList([...departmentList, department]);
            setDepartment("");
            (inputRef.current as HTMLInputElement).value = "";
        }
    }

    const onRegister = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(departmentList.length < 1){
            Swal.fire({
                icon: "error",
                title: "입력 오류",
                text: "등록할 부서를 하나 이상 입력하세요.",
            });
            return;
        }

        const variable = {
            department: departmentList,
        }


        Axios.post("/admin/department/create", variable, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
        }).then((response: AxiosResponse<String>) => {
            if(response.data) {
                Swal.fire({
                    icon: "success",
                    title: "부서 등록 성공",
                    text: "부서가 성공적으로 등록되었습니다.",
                });
                setDepartmentList([]);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "부서 등록 실패",
                    text: "부서 등록에 실패했습니다.",
                });
            }
        })
    }

    const style = {
        marginLeft : "auto",
        marginRight: "auto",
        borderRadius: "5px",
        boxShadow: "1px 2px 5px 1px lightgray",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        marginTop: "15px",
        height: "25px",
        justifyContent: 'space-between'
    };



    return(
        <div>
            <TextField
                fullWidth
                label="부서 등록"
                value={department}
                onChange={onchange}
                onKeyDown={onCheckEnter}
                inputRef={inputRef}
            />
            <hr />
            {departmentList.map((item, index) => (
                <div style={style} key={index}>
                    {item}
                    <IconButton
                        color="error"
                        component="label"
                        onClick={() => onDelete(item)}
                    >
                        <DeleteOutlineOutlinedIcon fontSize="small"/>
                    </IconButton>
                </div>
            ))}
            <Button
                variant="outlined"
                color="primary"
                style={{marginTop : "10px", float : "right"}}
                onClick={onRegister}
            >
                모두 등록
            </Button>
        </div>
    )

}

export default DepartmentRegister;