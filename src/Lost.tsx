import React, { useState } from 'react';
import { MenuProps, configProps } from './interface';

function Lost({ score, refreshGame }: { score: number, refreshGame: () => void }) {

    const [quit, setQuit] = useState(true);

    const handleQuit = () => {
        window.location.reload();
    }

    const handleRetry = () => {
        refreshGame();
    }

    return (
        <>

            {quit &&
                <div className="lost">
                    Score: {score}
                    <div className="lostButton">
                        <div className="quit" onClick={handleQuit}>
                            Quit
                        </div>
                        <div className="retry" onClick={handleRetry}>
                            Retry
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default Lost;