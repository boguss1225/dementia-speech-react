import "./odometer_anim.css";

const Odometer = function odometer_anim (props){
    const style = {"--num": props.value};
    
    return(
        <div className="box">
            <div className="content">
                <div className="percent" data-text={props.value} style={style}>
                    <div className="dot"></div>
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Odometer;