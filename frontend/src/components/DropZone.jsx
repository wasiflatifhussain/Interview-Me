import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import "./DropZone.css";
import S3 from 'react-aws-s3';
import axios from 'axios';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  width: 1100px;
  height: 150px;
  margin-left: 50px;
  margin-top: 30px;
  ${'' /* margin: 30px 80px; */}
`;

function DropZone() {
  const [selectedFile,setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

    // the configuration information is fetched from the .env selectedFile
//   const config = {
//         bucketName: process.env.REACT_APP_BUCKET_NAME,
//         region: process.env.REACT_APP_REGION,
//         accessKeyId: process.env.REACT_APP_ACCESS,
//         secretAccessKey: process.env.REACT_APP_SECRET,
//   }
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0])
    setUploadedFileName(acceptedFiles[0].name)
  })

//   const handleUpload = () => {
//     console.log("Uploading File",selectedFile.name);
    
//   }

//   const uploadFile = async (selectedFile) => {
//         const ReactS3Client = new S3(config);
//         // the name of the selectedFile uploaded is used to upload it to S3
//         ReactS3Client
//         .uploadFile(selectedFile, selectedFile.name)
//         .then(data => console.log(data.location))
//         .catch(err => console.error(err))
//   }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file',selectedFile);
    formData.append('userName',JSON.parse(localStorage.getItem("userName")));
    // send the form data to the backend API using Axios
    try {
      const response = await axios.post('http://localhost:8000/users/upload/cv', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop,
                   multiple: false,
                   accept: {'application/pdf': [],
                            'application/msword':[],
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document':[]}});
  
  return (
    <div className="container">
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Drag and drop resume here, or click to select file to upload to your account</p>
        <em>(Only *.pdf and *.docx files will be accepted)</em>
      </Container>
      <input type="submit" onClick={handleSubmit} value="Click to upload dropped file" className='adjustUp'/>
      {uploadedFileName && (
        <p className='promptdrop'>Dropped File: <br></br>{uploadedFileName}. Upload?</p>
      )}
    </div>
  );
}

export default DropZone;