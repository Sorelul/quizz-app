function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
    const percentage = Math.ceil((points / maxPossiblePoints) * 100);

    let emoji = "🤔";
    if (percentage === 100) {
        emoji = "🥇";
    } else if (percentage >= 90 && percentage < 100) {
        emoji = "🥈";
    } else if (percentage >= 80 && percentage < 90) {
        emoji = "🥉";
    } else if (percentage >= 50 && percentage < 80) {
        emoji = "👍";
    } else {
        emoji = "😓";
    }

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%) {emoji}
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
                Reset 👈{" "}
            </button>
        </>
    );
}

export default FinishScreen;
