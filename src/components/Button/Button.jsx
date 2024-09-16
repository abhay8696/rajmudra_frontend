import React from "react";
import LoadingImg from "../LoadingImg/LoadingImg";

const Button = ({ text, type, customClass, clickFunction, requestPending }) => {
    return (
        <button
            type={type}
            className={`${customClass} flex items-center justify-center gap-2 capitalize self-center  bg-inherit rounded-lg`}
            onClick={clickFunction}
        >
            <LoadingImg customClass={`w-[25px] opacity-0`} />

            <span
                className={`${
                    requestPending ? "opacity-50" : "opacity-100"
                } transition-all duration-[250ms]`}
            >
                {text}
            </span>

            <LoadingImg
                customClass={`w-[25px] transition-all duration-[250ms] ${
                    requestPending ? "opacity-100" : "opacity-0"
                }`}
            />
        </button>
    );
};

export default Button;
