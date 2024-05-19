import { useState } from "react";

function Lost({
  score,
  refreshGame,
}: {
  score: number;
  refreshGame: () => void;
}) {
  const handleQuit = () => {
    window.location.reload();
  };

  const handleRetry = () => {
    refreshGame();
  };

  return (
    <div className="text-5xl absolute w-full h-full flex flex-col justify-center items-center">
      Score: {score}
      <div className="m-4 flex flex-row">
        <div className="p-8 hover:text-red-400" onClick={handleQuit}>
          Quit
        </div>
        <div className="p-8 hover:text-green-400" onClick={handleRetry}>
          Retry
        </div>
      </div>
    </div>
  );
}

export default Lost;
