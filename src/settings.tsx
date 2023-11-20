import React from 'react';
import { useState } from 'react';
import './app.css';


function Settings() {

    const [clicked, setClicked] = useState(false);

    const handleSurvival = () => {
        setClicked(!clicked);
    }

    return (
        <>
            <div className="settings">
                Settings
            </div>
        </>
    );
}

export default Settings;