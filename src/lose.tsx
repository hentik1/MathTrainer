import './mode.css';

function Lose({ score, max }: { score: number, max: number }) {

    const handleQuit = () => {
        window.location.reload();
    }

    return (
        <>
            <div className="lost">
                Score: {score}
                <div className="lostButton">
                    <div className="quit" onClick={handleQuit}>
                        Quit
                    </div>
                </div>
            </div>
        </>
    );
}

export default Lose;