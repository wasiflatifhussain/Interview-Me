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
  margin-left: 80px;
  margin-top: 30px;
  ${'' /* margin: 30px 80px; */}
`;

function DropZoneCover() {
  const [selectedFile,setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');


  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0])
    setUploadedFileName(acceptedFiles[0].name)
  })



  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file',selectedFile);
    formData.append('userName',JSON.parse(localStorage.getItem("userName")));
    // send the form data to the backend API using Axios
    try {
      const response = await axios.post('http://localhost:8000/users/upload/cover', formData);
      console.log("success");
      setUploadStatus("success");
      
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
    <div id="container">
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Drag and drop cover letter here, or click to select file to upload to your account</p>
        <em>(Only *.pdf and *.docx files will be accepted)</em>
      </Container>
      
      {uploadedFileName && (
        <div>
        <input id="upBtn" type="submit" onClick={handleSubmit} value="Click to upload dropped file" className='adjustUp'/>
        <p id='promptdrop'>Dropped File: <br></br>{uploadedFileName}. Upload?</p>
        </div>
        /* document.getElementById("container").style.marginBottom = "20px" */
      )}
      {uploadStatus && (
        document.getElementById("promptdrop").innerHTML = "File Uploaded Successfully.",
        setUploadStatus(""),
        setTimeout(function() {
          document.getElementById("promptdrop").innerHTML = "";
          setFile(null);
          setUploadedFileName("");
        },5000)
         
      )}
    </div>
  );
}

export default DropZoneCover;