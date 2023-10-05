import React, { useEffect , useState } from 'react';

const FetchingBackend = (props) => {

    const [backendData, setBackendData] = useState([{}]);
    
    useEffect(() => {
        fetch("/transcript").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    },[props.submitStatus])
    console.log("backendData : ",backendData);

    return(
        <div>
            {(typeof backendData.transcript === 'undefined') ? (
                <p>loading...</p>
            ): (
                <p>done </p>
            )}
        </div>
    )
}

export default FetchingBackend;