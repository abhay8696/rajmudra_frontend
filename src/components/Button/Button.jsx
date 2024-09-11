import React from "react";

const Button = ({ text, type, customClass }) => {
    return (
        <button
            type={type}
            className={`${customClass} capitalize bg-primary self-center w-[100px] px-4 py-2 bg-inherit rounded-lg`}
        >
            {text}
        </button>
    );
};

export default Button;
