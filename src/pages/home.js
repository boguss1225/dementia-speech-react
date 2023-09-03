
import './home.css';

function Instruction() {
    return (<>
            <h1> Mode 1 - Home </h1>
            <h4> In this test, the ‘Cookie Theft’ picture from the Boston Diagnostic Aphasia Examination will be displayed. </h4>
            <h4>  1. In your own words, describe what you see in the most detail you can.</h4>
            <h4>  2. Try to talk for at least 1 minute. </h4>
        </>);
}

function Start_button(){
    return(
        <button name='start_btn' onClick={event=>{
            event.preventDefault();
            //trigger recording
        }}> start now </button>
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