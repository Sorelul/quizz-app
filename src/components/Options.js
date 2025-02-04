import Option from "./Option";

function Options({ question }) {
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <Option key={index} option={option} />
            ))}
        </div>
    );
}

export default Options;
