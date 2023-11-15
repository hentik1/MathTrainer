import React from 'react';
import { useState } from 'react';


function Settings() {

    const [clicked, setClicked] = useState(false);

    const handleSurvival = () => {
        setClicked(!clicked);
    }

    return (
        <>
            <div>
                Settings
            </div>
        </>
    );
}

export default Settings;