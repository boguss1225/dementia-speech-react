import "./recording_util.css";
import RecordAnimation from "./record_anim";
import { useState, useRef } from "react";
import { postData } from "./PostData";
import { uploadBlob } from "./UploadBlob";

const AudioRecorder = (props) => {
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [recordingPaused, setRecordingPaused] = useState(false); // Add recordingPaused state
  const [audioBlob, setAudioBlob] = useState(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
    props.onChangeState("recording");
  };

  const pauseRecording = () => {
    if (recordingStatus === "recording") {
      mediaRecorder.current.pause();
      setRecordingStatus("paused");
      setRecordingPaused(true);
      props.onChangeState("pause");
    }
  };

  const resumeRecording = () => {
    if (recordingStatus === "paused") {
      mediaRecorder.current.resume();
      setRecordingStatus("recording");
      setRecordingPaused(false);
      props.onChangeState("recording");
    }
  };

  const stopRecording = () => {
    setRecordingStatus("stop");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioBlob(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
    props.onChangeState("stop");
  };

  const restartRecording = () => {
    setRecordingStatus("inactive");
    //send the recording instance -> NLP
    
    props.onChangeState("standby");
  };

  const submitRecording = () => {
    setRecordingStatus("inactive");
    //upload to Butcket
    postData();
    uploadBlob(audioBlob);
    props.onChangeState("submitted");
  };

  return (
      <div className={recordingStatus} id="cntr_panel">
        {/* Get Mic Button */}
        {!permission ? (
          <button
            onClick={getMicrophonePermission}
            className="control_btn"
            id="start_ctrl_btn"
            type="button"
          >
            Get Microphone
          </button>
        ) : null}

        {/* Start button */}
        {permission && recordingStatus === "inactive" ? (
          <button
            onClick={startRecording}
            className="control_btn"
            id="start_ctrl_btn"
            type="button"
          >
            <i className="fa fa-play"></i>
            <div>Start</div>
          </button>
        ) : null}

        {/* Resume/Pause Button */}
        {recordingStatus === "recording" ? (
          <button onClick={pauseRecording} className="control_btn" type="button">
            <i className="fa fa-pause"></i>
            <div>{recordingPaused ? "Resume" : "Pause"}</div>
          </button>
        ) : null}

        {/* Resume Button */}
        {recordingStatus === "paused" ? (
          <button onClick={resumeRecording} className="control_btn" type="button">
            <i className="fa fa-play"></i>
            <div>Resume</div>
          </button>
        ) : null}

        {/* Stop Button */}
        {recordingStatus === "recording" || recordingStatus === "paused" ? (
          <button onClick={stopRecording} className="control_btn" type="button">
            <i className="fa fa-stop"></i>
            <div>Stop</div>
          </button>
        ) : null}

        {/* Restart Button */}
        {recordingStatus === "stop" ? (
          <button
            onClick={restartRecording}
            className="control_btn"
            type="button"
          >
            <i className="fa fa-rotate-right"></i>
            <div>Restart</div>
          </button>
        ) : null}

        {/* Submit Button */}
        {recordingStatus === "stop" ? (
          <button onClick={submitRecording} className="control_btn" type="button">
            <i className="fa fa-check"></i>
            <div>Submit</div>
          </button>
        ) : null}

        {/* Animation */}
        {recordingStatus === "recording" ? (
          <RecordAnimation />
        ) : null}

        {/* {audio ? (
          <div className="audio-container">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null} */}
        
      </div>
  );
};

export default AudioRecorder;
