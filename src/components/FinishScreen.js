function FinishScreen({ points, maxPossiblePoints }) {
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
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%) {emoji}
        </p>
    );
}

export default FinishScreen;
