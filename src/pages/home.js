import './home.css';
import testimage from "../asset/testimage1.PNG";
import AudioRecorder from "./utility/recording_util";
import ResultPage from "./result";
import { useState } from 'react';

function Instruction() {
    return (<div className="container">
                <h1> Mode 1 - Home </h1>
                <h5> When you click Start, an image will be displayed. </h5>
                <h5>  1. Describe what you see in the most detail you can.</h5>
                <h5>  2. Try to talk for at least 1 minute. </h5>
        </div>);
}

function MainImgPanel(props){
    return(
        <div className="container">
            <img className={props.recording_state} src={testimage} alt="cookie jar" />
            {/* {contextInterface} */}
            <AudioRecorder onChangeState={(mode)=>{
                props.onChangeRecordingState(mode);
            }}  />
        </div>
    )
}

function Home (props) {
    // recording state: standby, recording, pause, stop, submitted
    const [recording_state, setRecording_state] = useState('standby');

    let contextControl = null;
    if(recording_state === "standby" ||
    recording_state === "recording" ||
    recording_state === "pause" ||
    recording_state === "stop") {
        contextControl = <div>
            <Instruction />
            <MainImgPanel recording_state={recording_state} onChangeRecordingState={(mode)=>{
                setRecording_state(mode);
            }}/>
        </div>
    }
    if(recording_state === "submitted") {
        contextControl = <ResultPage 
            onChangeRecordingState={(mode)=>{setRecording_state(mode);}} 
            onChangeMode={(mode)=>{props.onChangeMode(mode);}}
            />
    }

    // Home
    return (
        <div>
            {contextControl}
        </div>
    );
}

export default Home;