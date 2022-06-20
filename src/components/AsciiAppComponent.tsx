import React, { ReactInstance } from "react";
import CSS from "csstype";
import ReactToPrint from "react-to-print";
import TextAreaCompoment from "./TextAreaComponent";
import EncodedAreaComponent, { grid, row } from "./EncodedAreaComponent";

const containerStyles: CSS.Properties = {
    overflow: "auto",
    height: "75vh"
};

interface props {
    message?: string;
    encodedMessage?: string;
    grid?: grid;
};

class AsciiAppComponent extends React.Component {
    componentRef: ReactInstance | null;
    state: props;

    constructor(props: props) {
        super(props);

        this.componentRef = null;

        this.state = {
            message: undefined,
            encodedMessage: undefined,
            grid: undefined
        };
    }

    encodeMessage = (value?: string) => {
        const ascii = value?.split("").map(c => { return c.charCodeAt(0) });
        return ascii?.join(" ");
    };

    getDataGrid = (encodedMessage: string) => {
        const values = encodedMessage.split(" "), table: grid = { rows: [] }, c = "_";
        let row: row, sqrt = 0, ri = 0, ci = 0;

        sqrt = Math.floor(Math.sqrt(values.length));
        while (sqrt * sqrt < values.length) {
            values.push("" + c.charCodeAt(0));
            sqrt = Math.floor(Math.sqrt(values.length));
        }

        for (ri = 0; ri < sqrt; ri++) {
            row = { cols: [] };
            for (ci = 0; ci < sqrt; ci++) {
                row.cols?.push({ value: values[(ri * sqrt) + ci] });
            }
            table.rows?.push(JSON.parse(JSON.stringify(row)));
        }

        return table;
    }

    onChangeHandler = (message: string) => {
        const encodedMessage = this.encodeMessage(message);
        const grid = encodedMessage ? this.getDataGrid(encodedMessage) : undefined;
        this.setState({ message, encodedMessage, grid });
    };

    componentDidMount() {
        const message = "Hello there!";
        this.onChangeHandler(message);
    }

    render() {
        const { message, grid } = this.state;

        return (
            <div>
                <div className="containter-fluid pt-3">
                    <TextAreaCompoment message={message} label={"Paste any text here..."} onChangeHandler={this.onChangeHandler} />
                </div>
                <div className="container-fluid mt-3" style={containerStyles}>
                    <EncodedAreaComponent grid={grid} ref={el => (this.componentRef = el)} />
                </div>
                <div className="container-fluid mt-3">
                    <ReactToPrint
                        trigger={() => <div className="btn btn-secondary"><i className="bi bi-printer"></i> Print</div>}
                        content={() => this.componentRef}
                    />
                </div>
            </div>
        )
    }
}

export default AsciiAppComponent;