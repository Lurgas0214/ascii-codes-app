import React from "react";

const labelStyles = {
    color: "#353535"
};

const textareaStyles = {
    height: 100
};

interface props {
    label?: string;
    message?: string;
    onChangeHandler?: Function;
}

class TextAreaCompoment extends React.Component<props>{
    render() {
        const { message, onChangeHandler } = this.props;
        let { label } = this.props;

        if (!label) label = "Textarea...";

        return (
            <div className="form-floating">
                <textarea id="floatingTextarea" className="form-control" style={textareaStyles} onChange={(event) => {
                    if (onChangeHandler) onChangeHandler(event.target.value);
                }} value={message} placeholder={label}></textarea>
                <label htmlFor="floatingTextarea" style={labelStyles}>{label}</label>
            </div>
        )
    }
}

export default TextAreaCompoment;