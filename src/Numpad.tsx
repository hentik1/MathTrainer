import React, { useState } from 'react';
import './App.css';

function Numpad() {

    const [toggle, setToggle] = useState(false);

    const handleNumpad: React.MouseEventHandler<HTMLDivElement> = (event) => {
        console.log(event.target);
    }


    return (
        <div className="numpad" onClick={handleNumpad}>
            <div className="row backspace">
                <div className="backspace">Backspace</div>
            </div>
            <div className="row">
                <div>7</div><div>8</div><div>9</div>
            </div>
            <div className="row">
                <div>4</div><div>5</div><div>6</div>
            </div>
            <div className="row">
                <div>1</div><div>2</div><div>3</div>
            </div>
            <div className="row">
                <div>0</div><div>.</div><div>-</div>
            </div>
            <div className="row enter">
                <div className="enter">Enter</div>
            </div>
        </div>
    );
}

export default Numpad;