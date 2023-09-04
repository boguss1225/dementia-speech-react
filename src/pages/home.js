import './home.css';
import testimage from "../asset/testimage1.PNG";

function Instruction() {
    return (<div class="container">
                <h1> Mode 1 - Home </h1>
                <h5> In this test, the ‘Cookie Theft’ picture from the Boston Diagnostic Aphasia Examination will be displayed. </h5>
                <h5>  1. In your own words, describe what you see in the most detail you can.</h5>
                <h5>  2. Try to talk for at least 1 minute. </h5>
        </div>);
}

function Start_button(){
    return(
        <div class="container">
            <img src={testimage} alt="cookie jar" />
            <button class="btn" onClick={event=>{
                event.preventDefault();
                //trigger recording
            }}>Start</button>
        </div>
    )
}

function Home (props) {
    // create tags for Home
    let tags = null;
    tags=<div>
            <Instruction />
            <Start_button />
        </div>

    // return
    return (
        <div>
            {tags}
        </div>
    );
}

export default Home;