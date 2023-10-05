import Odometer from './utility/odometer_anim';
import { useEffect, useState } from 'react';

function RestartBtn(props) {
    return(
        <button 
            onClick={event=>{
                event.preventDefault();
                props.onChangeRecordingState("standby")
            }} 
            className="control_btn"
            type="button"
        >
            <i className="fa fa-rotate-right"></i>
            <div>Restart</div>
        </button>
        )
}

function RankButton(props) {
    return(
        <button
            onClick={event=>{
                event.preventDefault();
                props.onChangeMode(2); //Go to Rank Page
            }}
            className="control_btn"
            type="button"
        >
            <i className="fa fa-globe"></i>
            <div>My Rank</div>
        </button>
    )
}

function ResultPage(props) {
    const [backendData, setBackendData] = useState(null);
    const [score,setScore] = useState("92");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{fetch("/fectchScore").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data[0].score)
                setIsLoading(false); 
            }
        ).catch(
            error => {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Set loading to false on error too
            }
        )},[])

    useEffect(() => {
            setScore(String(backendData));
        }, [backendData]);

    return (
        <div className="container">
            <h1> Result </h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Odometer value={score} />
            )}
            <RankButton onChangeMode={(mode)=>props.onChangeMode(mode)} />
            <RestartBtn onChangeRecordingState={(mode)=>{props.onChangeRecordingState(mode)}} />
        </div>
    );
}

export default ResultPage;