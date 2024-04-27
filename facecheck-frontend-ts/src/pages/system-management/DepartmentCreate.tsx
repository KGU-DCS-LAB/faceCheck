import React, {useRef, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const DepartmentCreate:React.FC = () => {
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
        </div>
    )

}

export default DepartmentCreate;