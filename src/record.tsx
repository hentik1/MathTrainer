import React from 'react';
import { useState } from 'react';
import './app.css';


function Record() {

    const [clicked, setClicked] = useState(false);

    const handleSurvival = () => {
        setClicked(!clicked);
    }

    return (
        <>
            <div className="record">
                Records
            </div>
        </>
    );
}

export default Record;