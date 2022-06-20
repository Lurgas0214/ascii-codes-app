import React from "react";
import CSS from 'csstype';
import { col } from "./EncodedAreaComponent";

const AsciiColorValue = (props: col) => {
    const lvl = ("00" + props.value).substr(-2, 2);

    const clrCode = "#" + "c8" + lvl + "eb";

    const style: CSS.Properties = {
        backgroundColor: clrCode,
        minHeight: "15px",
        minWidth: "15px"
    };

    return (
        <div title={clrCode} style={style} />
    );
};

export default AsciiColorValue;