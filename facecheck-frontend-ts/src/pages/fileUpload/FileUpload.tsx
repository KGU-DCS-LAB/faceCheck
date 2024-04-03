import React from "react";
import Dropzone, {useDropzone} from "react-dropzone";
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Box, Typography} from "@mui/material";

const FileUpload:React.FC = () => {

    const  { getRootProps , getInputProps }  =  useDropzone ( )

    return  (
        <Dropzone
            // onDrop
            multiple = {false}  //false는 파일 하나, true는 파일 여러개
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