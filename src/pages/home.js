import './home.css';
import testimage from "../asset/testimage1.PNG";
import AudioRecorder from "./utility/recording_util";
import { useState } from 'react';

function Instruction() {
    return (<div class="container">
                <h1> Mode 1 - Home </h1>
                <h5> When you click Start, an image will be displayed. </h5>
                <h5>  1. Describe what you see in the most detail you can.</h5>
                <h5>  2. Try to talk for at least 1 minute. </h5>
        </div>);
}

function Control_button(props){
    // define btns
    const start_btn = <button class='control_btn' id='start_ctrl_btn' onClick={event=>{
                        event.preventDefault();
                        props.onChangeState("recording");
                    }}><i class="fa fa-play"></i> <div>Start</div></button>
    const pause_btn = <button class='control_btn' onClick={event=>{
                        event.preventDefault();
                        props.onChangeState("pause");
                    }}><i class="fa fa-pause"></i> <div>Pause</div></button>
    const recording_btn = <button class='control_btn' onClick={event=>{
                        event.preventDefault();
                        props.onChangeState("recording");
                    }}><i class="fa fa-play"></i> <div>Resume</div></button>
    const restart_btn = <button class='control_btn' onClick={event=>{
                        event.preventDefault();
                        props.onChangeState("standby");
                    }}><i class="fa fa-rotate-right"></i> <div>Restart</div></button>
    const stop_btn = <button class='control_btn' onClick={event=>{
                        event.preventDefault();
                        props.onChangeState("stop");
                    }}><i class="fa fa-stop"></i> <div>Stop</div></button>
    const end_btn = <button class='control_btn' onClick={event=>{
                        event.preventDefault();
                        props.onChangeState("standby");
                    }}><i class="fa fa-check"></i> <div>Submit</div></button>
    
    // dynamic interface
    if(props.state === "standby"){
        return(
            <div class="control_button1">
                {start_btn}
            </div>
        )
    }

    if(props.state === "stop"){
        return(
            <div class="control_button2">
                {restart_btn}
                {end_btn}
            </div>
        )
    }

    if(props.state === "recording"){
        return(
            <div class="control_button3">
                {pause_btn}
                {stop_btn}
            </div>
        )
    }

    if(props.state === "pause"){
        return(
            <div class="control_button2">
                {recording_btn}
                {stop_btn}
            </div>
        )
    }
}

function Main_img_Panel(props){
    let contextInterface = null;
    contextInterface = <Control_button state={props.state} onChangeState={(mode)=>{
        props.onChangeState(mode);
    }}/>

    return(
        <div class="container">
            <img class={props.state} src={testimage} alt="cookie jar" />
            {contextInterface}
            <AudioRecorder />
        </div>
    )
}

function Home (props) {
    // create tags for Home
    let tags = null;
    
    // recording state: stanby, recording, pause, stop, end
    const [recording_state, setRecording_state] = useState('standby'); 

    tags=<div>
            <Instruction />
            <Main_img_Panel state={recording_state} onChangeState={(mode)=>{
                setRecording_state(mode);
            }} />
        </div>

    // return
    return (
        <div>
            {tags}
        </div>
    );
}

export default Home;