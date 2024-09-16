import React from "react";
//assets
import loadingIcon from "../../assets/loading.svg";

const styleObj = {
    animation: "logo-spin infinite 2s linear",
};
const LoadingImg = ({ customClass }) => {
    return (
        <img
            src={loadingIcon}
            alt="loading"
            className={`LoadingImg ${customClass}`}
            style={styleObj}
        />
    );
};

export default LoadingImg;
