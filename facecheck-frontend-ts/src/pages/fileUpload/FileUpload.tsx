import React from "react";
import Dropzone from "react-dropzone";
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Box, Typography} from "@mui/material";
import Axios, {AxiosResponse} from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface FileUploadProps {
    onChange: (data: number[]) => void;
}

const FileUpload:React.FC<FileUploadProps> = ({ onChange }) => {

    const dropHandler = (files: File[]) => {
        let formData = new FormData();

        files.forEach(file => {
            formData.append("files", file);
        });
        console.log(formData.get("files"))

        Axios.post("/image/upload", formData, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                "content-type": "multipart/form-data",
            },
        }).then((response: AxiosResponse<number[]>) => {
            if(response.status === 200) {
                console.log(response.data);
                onChange(response.data);
                Swal.fire({
                    icon: "success",
                    title: "이미지 업로드 성공",
                    text: "성공적으로 업로드 되었습니다.",
                });
            }
        }).catch((error: any) => {
            if(error.response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "이미지 업로드 실패",
                    text: error.response.data,
                });
            }
        })
    }

    return  (
        <Dropzone
            onDrop={dropHandler}
            multiple = {true}  //false는 파일 하나, true는 파일 여러개
            maxSize = {1000000000}
        >
            {({ getRootProps, getInputProps }) => (
                <div style={{ height: '80px', border: '1px solid lightgray', display: 'flex', alignItems: 'center',
                    justifyContent: 'center'}} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Box style={{flexDirection : "column", alignItems : "center", display : "flex"}}>
                        <CloudUploadIcon fontSize="large" />
                        <Typography>
                            Click or drag to upload file
                        </Typography>
                    </Box>
                </div>
            )}
        </Dropzone>
    )
}



export default FileUpload