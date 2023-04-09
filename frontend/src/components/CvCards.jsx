import React from 'react';
import "./CvCards.css";
import { FaUserTie } from 'react-icons/fa';
import { DoughnutGraph } from './DoughnutGraph';


export default function CvCards(props) {
  return (
    <div class="mainCard" style={{display: "flex"}}>
        <div style={{width: "30%"}}>
            <div><span><span style={{marginRight: "10px", fontSize:"16px"}}><FaUserTie size={"20px"}/></span>File Name:</span></div>
            <div style={{marginLeft: "30px", marginTop: "2px", fontSize:"13px"}}>{props.fileName}</div>
            <div style={{marginLeft: "30px", marginTop: "5px", fontSize:"16px"}}>Upload date:</div>
            <div style={{marginLeft: "30px", marginTop: "2px", fontSize:"13px"}}>{props.uploadDate}</div>
        </div>
        <div style={{width: "20%", marginLeft: "80px"}}>
        <DoughnutGraph reviewRanges={[1,2,3,4,5]} />
        </div>
        <div style={{width: "18%", marginLeft:"-25px"}}>
            <div style={{paddingBottom: "15px"}}>Review Report for CV:</div>
            <div><input type="submit" className="analaiBtn" value="Click to View" /></div>
        </div>
        <div style={{width: "30%"}}>
            <div style={{textAlign: "right", marginRight: "10px"}}><input type="submit" className="analaiBtn" value="Analyze by AI" /></div>
            <div style={{textAlign: "right", marginRight: "10px"}}><input type="submit" className="deleteReq" value="Delete Resume" /></div>



        </div>
    </div>
  )
}
