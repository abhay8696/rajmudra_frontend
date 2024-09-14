import React from "react";
//assets
import loadingIcon from "../../assets/loading.svg";

const styleObj = {
    animation: "logo-spin infinite 2s linear",
};
const LoadingImg = ({ styles }) => {
    return (
        <img
            src={loadingIcon}
            alt="loading"
            className={`LoadingImg ${styles}`}
            style={styleObj}
        />
    );
};

export default LoadingImg;
