import React from 'react';

function Lost({ score, refreshGame }: { score: number, refreshGame: () => void }) {

    const handleQuit = () => {
        window.location.reload();
    }

    const handleRetry = () => {
        refreshGame();
    }

    return (
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
        </div>
    );
}

export default Lost;