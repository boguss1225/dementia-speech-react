// import { useEffect , useState } from 'react';

// function FectchScore (score) {
//     const [backendData, setBackendData] = useState([{}]);

//     useEffect(() => {fetch("/fectchScore").then(
//         response => response.json()
//     ).then(
//         data => {
//             setBackendData(data[0].score)
//         }
//     )},[score])
    
//     console.log("fectchScore : ", backendData)
//     return { backendData }
// }

// export default FectchScore;