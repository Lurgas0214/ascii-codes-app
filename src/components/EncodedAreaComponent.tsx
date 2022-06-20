import React from "react";
import CSS from 'csstype';
import AsciiColorValue from "./AsciiColorValue";


export interface col {
    value?: string | number;
}

export interface row {
    cols?: [col?];
}

export interface grid {
    rows?: [row?];
}

interface props {
    grid?: grid;
}

const tableStyles: CSS.Properties = {
    display: "inline-block"
};

class EncodedAreaComponent extends React.Component<props>{
    render() {
        const { grid } = this.props;

        return (
            <table style={tableStyles}>
                <tbody>
                    {grid?.rows?.map((row, ri) => {
                        return (
                            <tr key={"row_" + ri}>
                                {row?.cols?.map((col, ci) => {
                                    return (
                                        <td key={"row_" + ri + " col_" + ci}>
                                            <AsciiColorValue value={col?.value} />
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default EncodedAreaComponent;