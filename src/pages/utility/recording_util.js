import "./recording_util.css";
import "./record_anim.css";
import { useState, useRef } from "react";

const AudioRecorder = (props) => {
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [recordingPaused, setRecordingPaused] = useState(false); // Add recordingPaused state

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
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
    props.onChangeState("stop");
  };

  return (
    <div class={recordingStatus} id="cntr_panel">
      {!permission ? (
        <button
          onClick={getMicrophonePermission}
          class="control_btn"
          id="start_ctrl_btn"
          type="button"
        >
          Get Microphone
        </button>
      ) : null}
      {permission && recordingStatus === "inactive" ? (
        <button
          onClick={startRecording}
          class="control_btn"
          id="start_ctrl_btn"
          type="button"
        >
          <i class="fa fa-play"></i>
          <div>Start</div>
        </button>
      ) : null}
      {recordingStatus === "recording" ? (
        <button onClick={pauseRecording} class="control_btn" type="button">
          <i class="fa fa-pause"></i>
          <div>{recordingPaused ? "Resume" : "Pause"}</div>
        </button>
      ) : null}
      {recordingStatus === "paused" ? (
        <button onClick={resumeRecording} class="control_btn" type="button">
          <i class="fa fa-play"></i>
          <div>Resume</div>
        </button>
      ) : null}
      {recordingStatus === "recording" || recordingStatus === "paused" ? (
        <button onClick={stopRecording} class="control_btn" type="button">
          <i class="fa fa-stop"></i>
          <div>Stop</div>
        </button>
      ) : null}
      {recordingStatus === "recording" ? (
        <div class="recboxContainer">
            <i class="fa fa-microphone"></i>
            <div class="recbox recbox1"></div>
            <div class="recbox recbox2"></div>
            <div class="recbox recbox3"></div>
            <div class="recbox recbox4"></div>
            <div class="recbox recbox5"></div>
        </div>
      ) : null}

      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls></audio>
          <a download href={audio}>
            Download Recording
          </a>
        </div>
      ) : null}
    </div>
  );
};
export default AudioRecorder;
